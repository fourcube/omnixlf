const { app, ipcMain } = require('electron');

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
        { role: 'togglefullscreen' }
      ]
    },
    {
      label: "Edit",
      submenu: [
        { label: "Undo", accelerator: "CmdOrCtrl+Z", selector: "undo:" },
        { label: "Redo", accelerator: "Shift+CmdOrCtrl+Z", selector: "redo:" },
        { type: "separator" },
        { label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:" },
        { label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:" },
        { label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:" },
        { label: "Select All", accelerator: "CmdOrCtrl+A", selector: "selectAll:" }
      ]
    }
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
        { type: 'separator' },
        { role: 'services', submenu: [] },
        { type: 'separator' },
        { role: 'hide' },
        { role: 'hideothers' },
        { role: 'unhide' },
        { type: 'separator' },
        { role: 'quit' }
      ]
    })
  };

  return template;
}

module.exports = {
  template: createMenuTemplate
};
