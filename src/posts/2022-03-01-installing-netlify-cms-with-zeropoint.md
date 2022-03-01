---
layout: post
title: Installing Netlify CMS with Zeropoint
date: 2022-03-01T15:56:16.681Z
featuredImage: assets/images/uploads/screenshot-2022-03-01-111332.jpg
description: I finally got around to adding Netlfiy CMS to the site, allowing me
  to easily create new blog posts from the web using a minimal editor and all
  the custom fields I use in my posts.
tags:
  - development
---
I finally got around to adding [Netlfiy CMS](https://www.netlifycms.org/) to the site, allowing me to easily create new blog posts from the web using a minimal editor and all the custom fields I use in my posts.

Now, setting up Netlfiy CMS with [ZeroPoint](https://github.com/MWDelaney/ZeroPoint) is a tad different than doing so with a straight [11ty](https://www.11ty.dev/) install, so let me document the process here for those looking to do the same.

Before doing anything, Netlify users must make sure to [enable Identity](https://app.netlify.com/sites/lucid-nobel-dab1f7/settings/identity), adding GitHub as an external authentican service and enabling Git Gateway.

With that taken care of, open your **.eleventy.js** file in the root of your Zeropoint install, scroll to the bottom, and modify your *templateFormats* to incluse both html and yml files.
<pre class="code-block">
<code>templateFormats: ['njk', 'md', '11ty.js', 'yml', 'html'],</code>
</pre>
With that out of the way, create an **admin** folder under the **src** folder and create two files: **config.yml** and **index.html**.

**config.yml contents:**

<pre class="code-block">
<code>backend:</code>
   <code>name: git-gateway</code>
   <code>branch: master # Branch to update (optional; defaults to master)</code>
<code>media_folder: "src/assets/images/uploads"</code>
<code>public_folder: "assets/images/uploads"</code>
<code>collections:</code>
<code>- name: "post" # Used in routes, e.g., /admin/collections/blog</code>
<code>label: "Post" # Used in the UI</code>
<code>folder: "src/posts" # The path to the folder where the documents are stored</code>
<code>create: true # Allow users to create new documents in this collection</code>
<code>slug: "{{year}}-{{month}}-{{day}}-{{slug}}" # Filename template, e.g., YYYY-MM-DD-title.md</code>
<code>fields: # The fields for each document, usually in front matter</code>
<code>- {label: "Layout", name: "layout", widget: "hidden", default: "post"}</code>
<code>- {label: "Title", name: "title", widget: "string"}</code>
<code>- {label: "Publish Date", name: "date", widget: "datetime"}</code>
<code>- {label: "Featured Image", name: "featuredImage", widget: "image"}- {label: "Tags", name: "tags", widget: "list"}</code>
<code>- {label: "Body", name: "body", widget: "markdown"}</code>
</pre>

**index.html contents:**

<pre class="code-block">
<code>&lt;!doctype html&gt;</code>
<code>&lt;html&gt;</code>
<code>&lt;head&gt;</code>
   <code>&lt;meta charset="utf-8" /&gt;</code>
   <code>&lt;meta name="viewport" content="width=device-width, initial-scale=1.0" /&gt;</code>
   <code>&lt;title&gt;Devar-TTY Content Manager&lt;/title&gt;</code>
   <code>&lt;script src="https://identity.netlify.com/v1/netlify-identity-widget.js"&gt; .  &lt;/script&gt;</code>
<code>&lt;/head&gt;</code>
<code>&lt;body&gt;</code>
   <code>&lt;!-- Include the script that builds the page and powers Netlify CMS --&gt;</code>
   <code>&lt;script src="https://unpkg.com/netlify-cms@^2.0.0/dist/netlify-cms.js"&gt;&lt;/script&gt;</code>
<code>&lt;/body&gt;</code>
<code>&lt;/html&gt;</code>
</pre>
The config.yml file is where you'll set the paths for both the source and public image locations for your site. After that you'll be setting up the [collections](https://www.netlifycms.org/docs/collection-types/) for the CMS to display. In my example above you can see that I've got fields for the post layout, the title, the publish date, a featured image, tags, and, of course, the post body.

Once these files are all set, the final step is to add the following to **/src/assets/views/layouts/base.njk**, just before the end of the *&lt;/head&gt;* tag:
<pre class="code-block">
<code>&lt;script src="https://identity.netlify.com/v1/netlify-identity-widget.js"&gt; .  &lt;/script&gt;</code>
</pre>

As well as the following before the &lt;/body&gt; tag:
<pre class="code-block">
<code>&lt;script&gt;</code>
<code>if (window.netlifyIdentity) {</code>
   <code>window.netlifyIdentity.on("init", user =&gt; {</code>
      <code>if (!user) {</code>
         <code>window.netlifyIdentity.on("login", () =&gt; {</code>
            <code>document.location.href = "/admin/";</code>
         <code>});</code>
      <code>}</code>
   <code>});</code>
<code>}</code>
<code>&lt;/script&gt;</code>
</pre>
All that's left at this point is to build your site and hit /admin on your production URL!