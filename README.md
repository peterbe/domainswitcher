# Domainswitcher

**Caveat: Only works for `*.mozilla.org`, `*.allizom.org` and `*.mozilla.com` domains at the moment.** See [issue #1](https://github.com/peterbe/domainswitcher/issues/1).

A WebExtension to switch the current domain (and protocol) and redirect there.

This is useful if you've loaded, for example, a URL on your production site
and what to load the exact same URL but change the start of the URL
to `http://localhost:5000` instead for example.

Every time you do a domainswitch, the destination is remembered so next time
you visit that first URL, it remembers what you preference might be.

![Sample screenshot](https://github.com/peterbe/domainswitcher/raw/master/screenshot.png)
