# DEV Social Badge

![GitHub package.json
version](https://img.shields.io/github/package-json/v/BenjaminPrice/dev-social-badge?style=flat-square)
[![Contributions to DEV Widget are
welcomed](https://img.shields.io/badge/contributions-welcome-brightgreen?style=flat-square)](CONTRIBUTING.md)

Unofficial Social Badge for [DEV.to](https://dev.to/)

A social badge that pulls your reaction count for an article that’s been shared
on DEV.

## Installation and Usage

Add script at the end of `<body>` after all `<devto-badge>` tags.

_If you're using a template for your blog posts, I suggest adding this to the
template file for your blog posts - not your main site layout._ This will help
to reduce unnecessary API calls to [DEV.to](https://dev.to/).

```html
<devto-badge data-article-url="https://dev.to/benjaminjprice/introducing-the-dev-social-badge-1bc3"></devto-badge>
<script src="https://unpkg.com/dev-social-badge@0.1.0/dist/dev-social-badge.min.js"></script>
```

## Changelog

**[RELEASES](https://github.com/BenjaminPrice/dev-social-badge/releases)**

---

## Contributing

I'm still getting things started. As such, there aren't any/many issues created
yet. But, you can always checkout [CONTRIBUTING.md](CONTRIBUTING.md) for
Contribution guidelines.
