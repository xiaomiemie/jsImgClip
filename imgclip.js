function ImgClip(opt) {
  this.elem = opt.elem;
  this.container = this.elem.find('.move-box');
  this.img = this.elem.find('.img2');
  this.lastX = 0;
  this.lastY = 0;
  this.posX = 0;
  this.posY = 0;
  this.nowX = 0;
  this.nowY = 0;
  this.diffX = 0;
  this.diffY = 0;
  this.opts = {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
  }
  this.lastW = 0;
  this.lastH = 0;
  this.boxWidth = parseFloat(this.elem.css('width'));
  this.boxHeight = parseFloat(this.elem.css('height'));
  this.startEventInit();
  this.changeEvent();
}
ImgClip.prototype.startEventInit = function() {
  var self = this;
  self.container.on('mousedown', function(e) {
    self.startEvent(e);
    self.container.on('mousemove', function(e) {
      self.moveEvent(e);
    });
    $('body').on('mouseup', function(e) {
      self.container.off('mousemove');
      $('body').off('mouseup');
    });
  });
  //
  self.container.on('touchstart', function(e) {
    e.preventDefault();
    var e = e.originalEvent.touches[0]
    self.startEvent(e);
    self.container.on('touchmove', function(e) {
      var e = e.originalEvent.touches[0]
      self.moveEvent(e);
    });
    $('body').on('touchend', function(e) {
      self.container.off('mousemove');
      $('body').off('mouseup');
    });
  })
};
ImgClip.prototype.startEvent = function(e) {
  this.lastX = e.pageX;
  this.lastY = e.pageY;
  this.posX = parseFloat(this.container.css('left'));
  this.posY = parseFloat(this.container.css('top'));
}
ImgClip.prototype.moveEvent = function(e) {
    var self = this;
    self.nowX = e.pageX;
    self.nowY = e.pageY;
    self.diffX = self.nowX - self.lastX;
    self.diffY = self.nowY - self.lastY;
    self.Criticality();

  }
  //移动
ImgClip.prototype.Criticality = function() {
  var self = this;
  var _left = self.posX + self.diffX;
  var _top = self.posY + self.diffY;
  //左右
  if (_left >= 0 && _left <= self.boxWidth - parseFloat(self.container.css('width'))) {
    self.container.css('left', self.posX + self.diffX + 'px');
    self.opts.left = self.posX + self.diffX + 'px';
    self.opts.right = self.posX + self.diffX + parseFloat(self.container.css('width')) + 'px';
  } else if (_left < 0) {
    self.container.css('left', 0);
    self.opts.left = 0;
    self.opts.right = 0 + self.container.css('width');
  } else if (_left > self.boxWidth - parseFloat(self.container.css('width'))) {
    self.container.css('left', self.boxWidth - parseFloat(self.container.css('width')));
    self.opts.left = self.boxWidth - parseFloat(self.container.css('width')) + 'px';
    self.opts.right = self.boxWidth + 'px';
  }
  //上下
  if (_top >= 0 && _top <= self.boxHeight - parseFloat(self.container.css('height'))) {
    self.container.css('top', self.posY + self.diffY + 'px');
    self.opts.top = self.posY + self.diffY + 'px';
    self.opts.bottom = self.posY + self.diffY + parseFloat(self.container.css('height')) + 'px';
  } else if (_top < 0) {
    self.container.css('top', 0);
    self.opts.top = 0 + 'px';
    self.opts.bottom = 0 + parseFloat(self.container.css('height')) + 'px';
  } else if (_top > self.boxHeight - parseFloat(self.container.css('height'))) {
    self.container.css('top', this.boxHeight - parseFloat(self.container.css('height')));
    self.opts.top = this.boxHeight - parseFloat(self.container.css('height')) + 'px';
    self.opts.bottom = this.boxHeight + 'px';
  }
  self.moveImg();
}
ImgClip.prototype.moveImg = function() {
  var self = this;
  self.img.css('clip', 'rect(' + self.opts.top + ',' + self.opts.right + ',' + self.opts.bottom + ',' + self.opts.left + ')')
}
ImgClip.prototype.changeEvent = function() {
  var self = this;
  var _container = self.container;
  var _topleft = _container.find('.top-left');
  var _topcenter = _container.find('.top-center');
  var _topright = _container.find('.top-right');
  var _rightmiddle = _container.find('.right-middle');
  var _bottomright = _container.find('.bottom-right');
  var _bottomcenter = _container.find('.bottom-center');
  var _bottomleft = _container.find('.bottom-left');
  var _leftmiddle = _container.find('.left-middle');

  function moveEventConner(e, el, f1, f2, f3, f4) {
    e.stopPropagation();
    self.lastX = e.pageX;
    self.lastY = e.pageY;
    self.posX = parseFloat(_container.css('left'));
    self.posY = parseFloat(_container.css('top'));
    self.lastW = parseFloat(_container.css('width'));
    self.lastH = parseFloat(_container.css('height'));
    el.on('mousemove', function(e) {
      e.stopPropagation();
      self.nowX = e.pageX;
      self.nowY = e.pageY;
      self.diffX = self.nowX - self.lastX;
      self.diffY = self.nowY - self.lastY;
      self.Criticality2(f1, f2, f3, f4);
    })
    $('body').on('mouseup', function(e) {
      el.off('mousemove');
      $('body').off('mouseup');
    })
  };

  function moveEventConnerM(e, el, f1, f2, f3, f4) {
    self.lastX = e.pageX;
    self.lastY = e.pageY;
    self.posX = parseFloat(_container.css('left'));
    self.posY = parseFloat(_container.css('top'));
    self.lastW = parseFloat(_container.css('width'));
    self.lastH = parseFloat(_container.css('height'));
    el.on('touchmove', function(e) {
      e.preventDefault();
      e.originalEvent.cancelBubble = true;
      var e = e.originalEvent.touches[0];
      self.nowX = e.pageX;
      self.nowY = e.pageY;
      self.diffX = self.nowX - self.lastX;
      self.diffY = self.nowY - self.lastY;
      self.Criticality2(f1, f2, f3, f4);
    })
    $('body').on('touchend', function(e) {
      el.off('touchmove');
      $('body').off('touchend');
    })
  };

  function moveEventEdge(e, el, f1, f2, f3, f4) {
    e.stopPropagation();
    self.lastY = e.pageY;
    self.posY = parseFloat(_container.css('top'));
    self.lastH = parseFloat(_container.css('height'));
    el.on('mousemove', function(e) {
      e.stopPropagation();
      self.nowY = e.pageY;
      self.diffY = self.nowY - self.lastY;
      self.Criticality2(f1, f2, f3, f4);
    })
    $('body').on('mouseup', function(e) {
      el.off('mousemove');
      $('body').off('mouseup');
    })
  };

  function moveEventEdgeM(e, el, f1, f2, f3, f4) {
    self.lastY = e.pageY;
    self.posY = parseFloat(_container.css('top'));
    self.lastH = parseFloat(_container.css('height'));
    el.on('touchmove', function(e) {
      e.preventDefault();
      e.originalEvent.cancelBubble = true;
      var e = e.originalEvent.touches[0];
      self.nowY = e.pageY;
      self.diffY = self.nowY - self.lastY;
      self.Criticality2(f1, f2, f3, f4);
    })
    $('body').on('touchend', function(e) {
      el.off('touchmove');
      $('body').off('touchend');
    })
  };


  //上左  先左右，后上下。。。左右，上下，向左/向上true,向右向下flase
  _topleft.on('mousedown', function(e) {
    moveEventConner(e, _topleft, true, true, true, true);
  });
  _topleft.on('touchstart', function(e) {
    e.originalEvent.cancelBubble = true;
    moveEventConnerM(e.originalEvent.touches[0], _topleft, true, true, true, true);
  });
  //上中
  _topcenter.on('mousedown', function(e) {
    moveEventEdge(e, _topcenter, false, true, false, true);
  });
  _topcenter.on('touchstart', function(e) {
    e.originalEvent.cancelBubble = true;
    moveEventEdgeM(e.originalEvent.touches[0], _topcenter, false, true, false, true);
  });
  //上右
  _topright.on('mousedown', function(e) {
    moveEventConner(e, _topright, true, true, false, true);
  });
  _topright.on('touchstart', function(e) {
    e.originalEvent.cancelBubble = true;
    moveEventConnerM(e.originalEvent.touches[0], _topright, true, true, false, true);
  });
  //右中
  _rightmiddle.on('mousedown', function(e) {
    moveEventConner(e, _rightmiddle, true, false, false, false);
  });
  _rightmiddle.on('touchstart', function(e) {
    e.originalEvent.cancelBubble = true;
    moveEventConnerM(e.originalEvent.touches[0], _rightmiddle, true, false, false, false);
  });
  //下右
  _bottomright.on('mousedown', function(e) {
    moveEventConner(e, _bottomright, true, true, false, false);
  });
  _bottomright.on('touchstart', function(e) {
    e.originalEvent.cancelBubble = true;
    moveEventConnerM(e.originalEvent.touches[0], _bottomright, true, true, false, false);
  });
  //下中
  _bottomcenter.on('mousedown', function(e) {
    moveEventConner(e, _bottomcenter, false, true, false, false);
  });
  _bottomcenter.on('touchstart', function(e) {
    e.originalEvent.cancelBubble = true;
    moveEventConnerM(e.originalEvent.touches[0], _bottomcenter, false, true, false, false);
  });
  //下左
  _bottomleft.on('mousedown', function(e) {
    moveEventConner(e, _bottomleft, true, true, true, false);
  });
  _bottomleft.on('touchstart', function(e) {
    e.originalEvent.cancelBubble = true;
    moveEventConnerM(e.originalEvent.touches[0], _bottomleft, true, true, true, false);
  });
  //zuo zhong
  _leftmiddle.on('mousedown', function(e) {
    moveEventConner(e, _leftmiddle, true, false, true, false);
  });
  _leftmiddle.on('touchstart', function(e) {
    e.originalEvent.cancelBubble = true;
    moveEventConnerM(e.originalEvent.touches[0], _leftmiddle, true, false, true, false);
  });

}
ImgClip.prototype.Criticality2 = function(f1, f2, f3, f4) {
  var self = this;
  //左右
  if (f1) {
    //向左
    if (f3) {
      var _left = self.posX + self.diffX;
      if (_left >= 0) {
        self.container.css('left', self.posX + self.diffX + 'px');
        self.container.css('width', self.lastW - self.diffX);
        self.opts.left = self.posX + self.diffX + 'px';
      } else {
        self.container.css('left', 0);
        self.container.css('width', self.lastW + self.posX);
        self.opts.left = 0;
      }
    } else {
      //向右
      if (self.posX + self.lastW + self.diffX <= self.boxWidth) {
        self.container.css('width', self.lastW + self.diffX);
        self.opts.right = self.posX + self.diffX + self.lastW + 'px';
      } else {
        self.container.css('width', self.boxWidth - self.posX);
        self.opts.right = self.boxWidth - self.posX + 'px';
      }
    }
  }
  //上下
  if (f2) {
    if (f4) {
      var _top = self.posY + self.diffY;
      if (_top >= 0) {
        self.container.css('top', self.posY + self.diffY + 'px');
        self.container.css('height', self.lastH - self.diffY + 'px');
        self.opts.top = self.posY + self.diffY + 'px';
      } else {
        self.container.css('top', 0);
        self.container.css('height', self.lastH + self.posY + 'px');
        self.opts.top = 0 + 'px';
      }
    } else {
      if (self.posY + self.lastH + self.diffY <= self.boxHeight) {
        self.container.css('height', self.lastH + self.diffY + 'px');
        self.opts.bottom = self.lastH + self.diffY + self.posY + 'px';
      } else {
        self.container.css('height', self.boxHeight - self.posY + 'px');
        self.opts.bottom = self.boxHeight - self.posY + 'px';
      }
    }
  }


  self.moveImg();
}