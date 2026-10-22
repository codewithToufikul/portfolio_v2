import { useState, useEffect } from 'react';

const CACHE_KEY = 'toufikul_github_cache_v2';
const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour

// Curated fallback data if GitHub API limits (60 req/hr unauthenticated) or network offline
const FALLBACK_DATA = {
  isFallback: true,
  user: {
    login: 'codewithToufikul',
    name: 'Toufikul Islam',
    avatar_url: 'https://avatars.githubusercontent.com/u/105500000?v=4',
    bio: 'Full Stack Developer | MERN & React Native',
    public_repos: 42,
    followers: 18,
    following: 24,
    html_url: 'https://github.com/codewithToufikul',
  },
  repos: [
    {
      id: 1,
      name: 'home-tutor-provider',
      description: 'Tuition Management Platform with multi-role dashboards, Redis caching, and real-time Socket.io matching.',
      language: 'TypeScript',
      stargazers_count: 14,
      forks_count: 5,
      html_url: 'https://github.com/codewithToufikul/home-tutor-provider',
      updated_at: '2026-09-18T12:00:00Z',
    },
    {
      id: 2,
      name: 'fly-book-app',
      description: 'Social learning platform built with React Native for cross-platform iOS & Android distribution.',
      language: 'JavaScript',
      stargazers_count: 19,
      forks_count: 8,
      html_url: 'https://github.com/codewithToufikul/fly-book',
      updated_at: '2026-08-25T15:30:00Z',
    },
    {
      id: 3,
      name: 'service-pro-platform',
      description: 'Service booking platform with SSLCommerz payment gateway and real-time provider chat.',
      language: 'JavaScript',
      stargazers_count: 11,
      forks_count: 3,
      html_url: 'https://github.com/codewithToufikul/service-pro-client',
      updated_at: '2026-07-14T09:20:00Z',
    },
    {
      id: 4,
      name: 'hidayah-ai-engine',
      description: 'Conversational Islamic guidance web application with AI reasoning and Node API.',
      language: 'JavaScript',
      stargazers_count: 16,
      forks_count: 4,
      html_url: 'https://github.com/codewithToufikul/hidayah-ai',
      updated_at: '2026-06-10T18:40:00Z',
    },
  ],
  topLanguages: [
    { name: 'JavaScript', percentage: 48, color: '#f7df1e' },
    { name: 'TypeScript', percentage: 28, color: '#3178c6' },
    { name: 'HTML / CSS', percentage: 16, color: '#e34f26' },
    { name: 'Other', percentage: 8, color: '#8a9aa7' },
  ],
};

export function useGitHub(username = 'codewithToufikul') {
  const [data, setData] = useState(() => {
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const { timestamp, payload } = JSON.parse(cached);
        if (Date.now() - timestamp < CACHE_TTL_MS) {
          return { ...payload, loading: false, error: null };
        }
      }
    } catch (e) {}
    return { ...FALLBACK_DATA, loading: true, error: null, isFallback: true };
  });

  useEffect(() => {
    let isMounted = true;

    async function fetchGitHubData() {
      try {
        const [userRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${username}`, {
            headers: { Accept: 'application/vnd.github.v3+json' },
          }),
          fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`, {
            headers: { Accept: 'application/vnd.github.v3+json' },
          }),
        ]);

        if (!userRes.ok || !reposRes.ok) {
          throw new Error(`GitHub API HTTP ${userRes.status || reposRes.status}`);
        }

        const user = await userRes.json();
        const repos = await reposRes.json();

        // Calculate top languages
        const langCounts = {};
        let totalCounted = 0;
        repos.forEach((repo) => {
          if (repo.language) {
            langCounts[repo.language] = (langCounts[repo.language] || 0) + 1;
            totalCounted++;
          }
        });

        const langColors = {
          JavaScript: '#f7df1e',
          TypeScript: '#3178c6',
          HTML: '#e34f26',
          CSS: '#563d7c',
          Python: '#3572A5',
        };

        const topLanguages = Object.entries(langCounts)
          .map(([name, count]) => ({
            name,
            percentage: Math.round((count / (totalCounted || 1)) * 100),
            color: langColors[name] || 'var(--accent)',
          }))
          .sort((a, b) => b.percentage - a.percentage);

        const payload = {
          user,
          repos,
          topLanguages: topLanguages.length ? topLanguages : FALLBACK_DATA.topLanguages,
          isFallback: false,
          lastFetched: new Date().toISOString(),
        };

        if (isMounted) {
          setData({ ...payload, loading: false, error: null });
        }

        try {
          localStorage.setItem(
            CACHE_KEY,
            JSON.stringify({
              timestamp: Date.now(),
              payload,
            })
          );
        } catch (e) {}
      } catch (err) {
        console.warn('[GitHub API Notice] Falling back to telemetry proxy:', err.message);
        if (isMounted) {
          setData((prev) => ({
            ...prev,
            loading: false,
            error: err.message,
            isFallback: true,
          }));
        }
      }
    }

    fetchGitHubData();

    return () => {
      isMounted = false;
    };
  }, [username]);

  return data;
}
