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

Assuming the production application is in the same parent directory as this repo, find the copy task in Gruntfile.js and change the corresponding folder names to match. For example:

```
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

