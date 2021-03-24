
### Target product features
* Easily embeddable in existing git repo ('project')
* Render nice view of project
    * as set of Github Pages managed by SPA
        * canonical link to Github-hosted docs
    * Show project hierarchy (epics, features, user-stories and tasks)
    * Show `gantt` chart view
    * Show `board` view by entity status
        * e.g. ready for development, in development, ready for testing, ready for deployment
    * Show well-formatted notes/thinking
        * Thumbnails for references
    * Show progress against roadmap (future epics)
* Social sharing
    * Render views for embeds
        * as HTML (server-side rendering)
        * as images (for social sharing)
        * even as videos eventually
    * Cache rendered views based on commit ID/timestamp
        * will need re-rendering when the underlying content changes
    * Make it easy for these views to be shared
        * Simple URL structure with all view data
        * Rendered image data surfaced in `<meta>` [OpenGraph](https://ogp.me/) tags
    * Embeds
        * Allow rendered view to be embedded into another site
            * automatically updated
* Editable project plan
    * requires thinkho.pe-brokered GitHub auth login
    * requires thinkho.pe save
        * if you're an owner/collaborator
            * commit to project git repo
        * if you're another git user
            * commit to new git repo
            * create pull request
