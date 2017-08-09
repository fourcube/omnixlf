const {app, ipcMain} = require('electron');

function createMenuTemplate(window) {
  const template = [
    {
      label: 'File',

      submenu: [
        {
          label: 'Save',
          click: () => {
            window.send('save', {});
          },
          accelerator: 'CmdOrCtrl+S',
        },
        {
          label: 'Open',
          click: () => {
            window.send('open', {});
          },
          accelerator: 'CmdOrCtrl+O',
        }
      ]
    },
    {
      label: 'View',
      submenu: [
        {role: 'togglefullscreen'}
      ]
    },
  ];

  if (process.platform === 'darwin') {
    template.unshift({
      label: app.getName(),
      submenu: [
        {
          label: 'About OmniXLF',
          click: () => {
            window.send('about', {});
          }
        },
        {type: 'separator'},
        {role: 'services', submenu: []},
        {type: 'separator'},
        {role: 'hide'},
        {role: 'hideothers'},
        {role: 'unhide'},
        {type: 'separator'},
        {role: 'quit'}
      ]
    })
  };

  return template;
}

module.exports = {
  template: createMenuTemplate
};
