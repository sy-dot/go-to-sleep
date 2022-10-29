var title = document.getElementById('title').innerHTML;
document.getElementById('showTitle').innerHTML = title;

const settings = require(`./src/themes/dark.json`);

var body = document.body.style;
var nav = document.getElementById('nav').style;
var toggler = document.getElementById('togglers').style;
var Minimize = document.getElementById('minimizeBtn').style;
var Close = document.getElementById('closeBtn').style;

var styles = `
<style>
    // #togglers>#minimizeBtn:hover{
    //     background-color: ${settings.Toggler.Minimize.Background.Hover};
    //     color: ${settings.Toggler.Minimize.Color.Hover}
    // }
    // #togglers>#closeBtn:hover{
    //     background-color: ${settings.Toggler.Close.Background.Hover};
    //     color: ${settings.Toggler.Close.Color.Hover};
    // }
    </style>
`;

document.getElementById('head').innerHTML += styles;

body.color = settings.TextColor;

Minimize.BackgroundColor = settings.Toggler.Minimize.Background.Static;
Minimize.Color = settings.Toggler.Minimize.Color.Static;

Close.BackgroundColor = settings.Toggler.Close.Background.Static;
Close.Color = settings.Toggler.Close.Color.Static;