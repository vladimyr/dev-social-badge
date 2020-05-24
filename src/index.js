import './polyfills';
import badge from './badge.svg';
import globalThis from '@ungap/global-this';
import xhr from 'xhr';

const { Promise } = globalThis;

const prefixUrl = 'https://dev.to';
const reArticleId = /article-id\s*=\s*"([^"]+)"/;

[].map.call(document.querySelectorAll('devto-badge'), el => initBadge(el));

export function initBadge (el) {
  const { articleUrl, target } = el.dataset;
  return getArticleId(articleUrl)
    .then(articleId => getArticleInfo(articleId))
    .then(articleInfo => createBadge({
      target,
      articleId: articleInfo.id,
      articleUrl: articleInfo.url,
      count: articleInfo.positive_reactions_count
    }))
    .then(badge => replace(el, badge));
}

function createBadge ({ articleId, articleUrl, count, target = '_blank' }) {
  const a = document.createElement('a');
  Object.assign(a.dataset, { articleId, articleUrl });
  Object.assign(a, {
    href: articleUrl,
    target,
    rel: ['noopenner', 'noreferrer'].join(' '),
    innerHTML: badge
  });
  const text = a.querySelector('text');
  if (text) text.textContent = count;
  Object.assign(a.style, {
    display: 'inline-block',
    border: 'initial',
    textDecoration: 'initial'
  });
  return a;
}

function getArticleId (url) {
  return httpGet(url)
    .then(({ body: html }) => html.match(reArticleId) || [])
    .then(([_, articleId]) => articleId);
}

function getArticleInfo (articleId) {
  const url = [prefixUrl, `/api/articles/${articleId}?t=${Date.now()}`].join('');
  return httpGet(url, { json: true })
    .then(({ body: data }) => data);
}

function httpGet (url, options = {}) {
  return new Promise((resolve, reject) => {
    xhr.get(url, options, (err, resp) => {
      if (err) return reject(err);
      resolve(resp);
    });
  });
}

function replace (el, newEl) {
  return el.parentNode.replaceChild(newEl, el);
}
