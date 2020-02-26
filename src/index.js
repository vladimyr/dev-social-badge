import badge from './badge.svg';
import globalThis from '@ungap/global-this';
import objectAssign from 'object-assign';
import Promise from 'pinkie-promise';
import xhr from 'xhr';

globalThis.Promise = globalThis.Promise || Promise;

const prefixUrl = 'https://dev.to';

[].map.call(document.querySelectorAll('devto-badge'), el => initBadge(el));

export async function initBadge (el) {
  const { articleUrl } = el.dataset;
  const articleId = await getArticleId(articleUrl);
  const articleInfo = await getArticleInfo(articleId);
  const badge = createBadge({
    articleId,
    articleUrl,
    count: articleInfo.positive_reactions_count,
    target: el.dataset.target
  });
  return replace(el, badge);
}

function createBadge ({ articleId, articleUrl, count, target = '_blank' }) {
  const a = document.createElement('a');
  objectAssign(a, {
    href: articleUrl,
    target,
    rel: ['noopenner', 'noreferrer'].join(' ')
  });
  objectAssign(a.dataset, { articleId, articleUrl });
  a.innerHTML = badge;
  const text = a.querySelector('text');
  if (text) text.textContent = count;
  objectAssign(a.style, {
    display: 'inline-block',
    border: 'initial',
    textDecoration: 'initial'
  });
  return a;
}

async function getArticleId (url) {
  const { body: doc } = await httpGet(url, { responseType: 'document' });
  const article = doc.querySelector('[data-article-id]');
  return article && article.getAttribute('data-article-id');
}

async function getArticleInfo (articleId) {
  const url = [prefixUrl, `/api/articles/${articleId}`].join('');
  const { body: data } = await httpGet(url, { json: true });
  return data;
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
