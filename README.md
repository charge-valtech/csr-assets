# CSR Assets

This is where the frontend assets for the CSR Fast Track and Fast Stream projects live.

You'll need to have npm and grunt installed on your machine.

## Prototyping

### CSS

Don't run grunt from here, instead clone this repo into the same parent as your prototype lives, and point to ../csr-assets/scss to watch for changes. You should just end up with compiled CSS in your prototype's assets.

### JS

Again for non-vendor JS you should compile the modularised JS from here into your prototype.
Keep a prototype.js file separate from production JS to fake behaviour that you will be producing.

## Production

### Gruntfile

Assuming the production application is in the same parent directory as this repo, find the copy task in Gruntfile.js and change the corresponding folder names to match. For example:

```javascript
copy: {
  ft_assets: {
    expand: true,
    cwd: '_compiled/',
    src: [
        '**/*'
        ],
    dest: '../fasttrack-frontend/public/'
  },
  fs_assets: {
    expand: true,
    cwd: '_compiled/',
    src: [
        '**/*'
        ],
    dest: '../faststream-frontend/public/'
  }
}
```

Install dependencies with `npm install` and then start the example page with `grunt` - this will spin up a local server and should open the example patterns page.

### CSS

**Only make changes to .scss files**

After you've made your changes, hitting save should compile and refresh the example patterns page in your browser. 

### JS

**Make changes to files in the /js folder**

When you save your JavaScript, JS Hint should run against it and the page in the browser should refresh.

### Build

Once you're happy with your CSS and JavaScript changes, you can run `grunt build-ft` to copy your assets to Fast Track or `grunt build-fs` to copy your assets to Fast Stream