"use strict";
var socket = io();
var currentImageKey = null;
var settings = {
  theme: readCookie("settings['theme']") || 'dark',
  zoneID: readCookie("settings['zoneID']") || null
};
var css = {
  backgroundColor: '#232629',
  foregroundColor: '#eff0f1',
  colorBackground: '#000000'
};

$(document).ready(function() {
  setTheme(settings.theme);

  socket.on("pairStatus", function(payload) {
    if (payload && payload.pairEnabled === true) {
      $('#pairDisabled').fadeOut();
      socket.emit("getZone", settings.zoneID || true);
    } else {
      $('#pairDisabled').fadeIn();
    }
  });

  socket.on("zoneStatus", function(payload) {
    if (payload && payload.length > 0) {
      if (!settings.zoneID) {
        settings.zoneID = payload[0].zone_id;
        setCookie("settings['zoneID']", settings.zoneID);
      }
      
      const zone = payload.find(z => z.zone_id === settings.zoneID) || payload[0];
      if (zone.now_playing && zone.now_playing.image_key !== currentImageKey) {
        currentImageKey = zone.now_playing.image_key;
        updateImage(currentImageKey);
      }
    }
  });
});

function updateImage(imageKey) {
  if (!imageKey) {
    $('#coverImage').attr('src', '/img/transparent.png');
    $('#coverBackground').css('background-image', 'none');
    $('#colorBackground').css('background-color', '#000000');
    $('#clock').css('color', '#ffffff');
    return;
  }

  const imageUrl = '/roonapi/getImage?image_key=' + imageKey;
  $('#coverImage').attr('src', imageUrl);
  
  // 根据主题设置背景
  if (settings.theme === 'cover') {
    $('#coverBackground').css('background-image', 'url(' + imageUrl + ')').show();
    $('#colorBackground').hide();
    $('#clock').css('color', '#ffffff');
  } else if (settings.theme === 'color') {
    $('#coverBackground').hide();
    $('#colorBackground').show();
    
    // 使用 ColorThief 获取主色调
    const colorThief = new ColorThief();
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = function() {
      const color = colorThief.getColor(img);
      const [r, g, b] = color;
      css.colorBackground = `rgb(${r}, ${g}, ${b})`;
      
      // 计算亮度以决定文字颜色
      const brightness = (r * 299 + g * 587 + b * 114) / 1000;
      if (brightness >= 128) {
        css.foregroundColor = '#232629';
      } else {
        css.foregroundColor = '#eff0f1';
      }
      
      // 应用颜色
      $('#colorBackground').css('background-color', css.colorBackground);
      $('#clock').css('color', css.foregroundColor);
    };
    img.src = imageUrl;
  } else {
    // 深色主题
    $('#coverBackground').hide();
    $('#colorBackground').show();
    $('#colorBackground').css('background-color', '#232629');
    $('#clock').css('color', '#eff0f1');
  }
}

function setTheme(theme) {
  settings.theme = theme;
  if (theme === 'dark') {
    $('body').css('background-color', '#232629');
    $('#colorBackground').show().css('background-color', '#232629');
    $('#coverBackground').hide();
    $('#clock').css('color', '#eff0f1');
  }
  updateImage(currentImageKey);
}

function readCookie(name) {
  return Cookies.get(name);
}

// Cookie 辅助函数
function setCookie(name, value) {
  Cookies.set(name, value, { expires: 365 });
}
