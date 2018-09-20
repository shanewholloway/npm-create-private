const fs = require('fs')

const pkg_default = {
  private: true,
  version: '0.0.0',
  dependencies: {},
  devDependencies: {},
  scripts: {},
}

function create_private(package_json_filename='package.json') {
  return new Promise((resolve, reject) =>
    fs.readFile(package_json_filename, 'utf-8',
      (err, data) => err ? resolve() : resolve(data) ))
  .then(data => data ? JSON.parse(data) : null)
  .then(existing => Object.assign(existing, pkg_default, existing))
  .then(package_json => {
    const json_src = JSON.stringify(package_json, null, 2)
    console.dir(json_src)
    return new Promise((resolve, reject) =>
      fs.writeFile(package_json_filename, json_src,
        (err) => err ? reject(err) : resolve(package_json) ))
  })
}

if (module === require.main) {
  create_private('package.json')
}
