import * as fs from 'fs-extra';

try {
    fs.ensureDir('test-results')
      .then(() => {
          console.log('Folder exists');
      })
      .catch(err => {
          console.error(err)
      })

    fs.emptyDir('test-results')
      .then(() => {
          console.log('Empty successfully');
      })
      .catch(err => {
          console.error(err)
      })

} catch (error) {
    console.log('Folder not created!' + error);
}
