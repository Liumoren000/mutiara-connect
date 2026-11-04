# GitHub Pages

Source repository: https://github.com/Liumoren000/mutiara-connect

The Pages workflow checks JavaScript syntax, runs all 19 tests and publishes only `dist/`.

## One-time repository setting

In the repository, open **Settings → Pages → Build and deployment → Source**, and choose **GitHub Actions**. This is a repository administration setting; the connected tool used for this upload cannot change it.

Then open **Actions → Test and deploy Mutiara Connect → Run workflow** and choose `main`.

After the `deploy` job succeeds, GitHub shows the verified public URL in the `github-pages` environment. The expected standard address is https://liumoren000.github.io/mutiara-connect/ ; it is not live until deployment succeeds.

Future changes pushed to `dist/`, `tests/` or the workflow trigger validation and redeployment automatically. The app uses relative asset URLs and hash navigation, so it supports the repository subpath and refreshes of `#map` and other routes.

No secrets or access tokens are required by this workflow. Feedback remains in each visitor's browser; GitHub Pages does not add a database or send complaints to authorities.
