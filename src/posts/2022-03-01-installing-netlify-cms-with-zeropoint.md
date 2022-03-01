---
layout: post
title: Installing Netlify CMS with Zeropoint
date: 2022-03-01T15:56:16.681Z
featuredImage: assets/images/uploads/screenshot-2022-03-01-111332.jpg
tags:
  - development
---
I finally got around to adding [Netlfiy CMS](https://www.netlifycms.org/) to the site, allowing me to easily create new blog posts from the web using a minimal editor and all the custom fields I use in my posts.

Now, setting up Netlfiy CMS with [ZeroPoint](https://github.com/MWDelaney/ZeroPoint) is a tad different than doing so with a straight [11ty](https://www.11ty.dev/) install, so let me document the process here for those looking to do the same.

Before doing anything, Netlify users must make sure to [enable Identity](https://app.netlify.com/sites/lucid-nobel-dab1f7/settings/identity), adding GitHub as an external authentican service and enabling Git Gateway.

With that taken care of, open your **.eleventy.js** file in the root of your Zeropoint install, scroll to the bottom, and modify your *templateFormats* to incluse both html and yml files.

`templateFormats: ['njk', 'md', '11ty.js', 'yml', 'html'],`

With that out of the way, create an **admin** folder under the **src** folder and create two files: **config.yml** and **index.html**.

**config.yml contents:**

`backend:`

`  name: git-gateway`

`  branch: master # Branch to update (optional; defaults to master)`

``

`media_folder: "src/assets/images/uploads"`

`public_folder: "assets/images/uploads"```

`collections:`

`  - name: "post" # Used in routes, e.g., /admin/collections/blog`

`    label: "Post" # Used in the UI`

`    folder: "src/posts" # The path to the folder where the documents are stored`

`    create: true # Allow users to create new documents in this collection`

`    slug: "{{year}}-{{month}}-{{day}}-{{slug}}" # Filename template, e.g., YYYY-MM-DD-title.md`

`    fields: # The fields for each document, usually in front matter`

`      - {label: "Layout", name: "layout", widget: "hidden", default: "post"}`

`      - {label: "Title", name: "title", widget: "string"}`

`      - {label: "Publish Date", name: "date", widget: "datetime"}`

`      - {label: "Featured Image", name: "featuredImage", widget: "image"}`

`      - {label: "Tags", name: "tags", widget: "list"}`

`      - {label: "Body", name: "body", widget: "markdown"}`

**index.html contents:**

`<!doctype html>`

`<html>`

`<head>`

`  <meta charset="utf-8" />`

`  <meta name="viewport" content="width=device-width, initial-scale=1.0" />`

`  <title>Devar-TTY Content Manager</title>`

`  <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>`

`</head>`

`<body>`

`  <!-- Include the script that builds the page and powers Netlify CMS -->`

`  <script src="https://unpkg.com/netlify-cms@^2.0.0/dist/netlify-cms.js"></script>`

`</body>`

`</html>`

The config.yml file is where you'll set the paths for both the source and public image locations for your site. After that you'll be setting up the [collections](https://www.netlifycms.org/docs/collection-types/) for the CMS to display. In my example above you can see that I've got fields for the post layout, the title, the publish date, a featured image, tags, and, of course, the post body.

Once these files are all set, the final step is to add the following to **/src/assets/views/layouts/base.njk**, just before the end of the *</head>* tag:

`<script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>`

As well as the following before the </body> tag:

`<script>`

`   if (window.netlifyIdentity) {`

`      window.netlifyIdentity.on("init", user => {`

`         if (!user) {`

`            window.netlifyIdentity.on("login", () => {`

`               document.location.href = "/admin/";`

`            });`

`         }`

`      });`

`   }`

`</script>`

All that's left at this point is to build your site and hit /admin on your production URL!