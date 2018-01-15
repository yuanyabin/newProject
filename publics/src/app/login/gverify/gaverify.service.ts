import { Injectable, ElementRef, ViewChild } from '@angular/core';

@Injectable()

export class GaverifyService {
    canvasTag: any;
    viewValue: any = {
        canvasId: 'verifyCanvas', // canvas的ID
        width: '100', // canvas宽度
        height: '37', // canvas高度
        type: 'blend', // 图形验证码类型blend
        code: ''
    };

    getValue(options, canvasElement) {
        // console.log(canvasElement);
        if (Object.prototype.toString.call(options) === '[object object]') {
            for (let i in options) {
                this.viewValue[i] = options[i]
            }
        }
        this.canvasTag = canvasElement;
        this.viewValue.numArr = '0,1,2,3,4,5,6,7,8,9'.split(',');
        this.viewValue.letterArr = this.getAllLetter();
        this._init();
        this.refresh();
    }

    _init() {
        this.viewValue.width = '100';
        this.viewValue.height = '34';
        const canvas = this.canvasTag;
        // canvas.id = this.viewValue.canvasId;
        canvas.width = this.viewValue.width;
        canvas.height = this.viewValue.height;
        canvas.style.cursor = 'pointer';
        canvas.innerHTML = '您的浏览器版本不支持canvas';
        const _this = this;
        canvas.onclick = function () {
            _this.refresh();
        };
    }

    // 刷新验证码
    refresh() {
        let ctx;
        this.viewValue.code = '';
        const canvas = this.canvasTag;
        if (canvas.getContext) {
            ctx = canvas.getContext('2d');
        } else {
            return;
        }

        ctx.textBaseline = 'middle';

        ctx.fillStyle = this.randomColor(180, 240);
        ctx.fillRect(0, 0, this.viewValue.width, this.viewValue.height);

        const txtArr = this.viewValue.numArr.concat(this.viewValue.letterArr);

        for (let i = 1; i <= 4; i++) {
            const txt = txtArr[this.randomNum(0, txtArr.length)];
            this.viewValue.code += txt;
            ctx.font = this.randomNum(this.viewValue.height / 2, this.viewValue.height) + 'px SimHei'; // 随机生成字体大小
            ctx.fillStyle = this.randomColor(50, 160); // 随机生成字体颜色
            ctx.shadowOffsetX = this.randomNum(-3, 3);
            ctx.shadowOffsetY = this.randomNum(-3, 3);
            ctx.shadowBlur = this.randomNum(-3, 3);
            ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
            const x = this.viewValue.width / 5 * i;
            const y = this.viewValue.height / 2;
            const deg = this.randomNum(-30, 30);

            // 设置旋转角度和坐标原点
            ctx.translate(x, y);
            ctx.rotate(deg * Math.PI / 180);
            ctx.fillText(txt, 0, 0);

            // 恢复旋转角度和坐标原点
            ctx.rotate(-deg * Math.PI / 180);
            ctx.translate(-x, -y);
        }
        // 绘制干扰线
        for (let i = 0; i < 4; i++) {
            ctx.strokeStyle = this.randomColor(40, 180);
            ctx.beginPath();
            ctx.moveTo(this.randomNum(0, this.viewValue.width), this.randomNum(0, this.viewValue.height));
            ctx.lineTo(this.randomNum(0, this.viewValue.width), this.randomNum(0, this.viewValue.height));
            ctx.stroke();
        }

        // 绘制干扰点
        for (let i = 0; i < this.viewValue.width / 4; i++) {
            ctx.fillStyle = this.randomColor(0, 255);
            ctx.beginPath();
            ctx.arc(this.randomNum(0, this.viewValue.width), this.randomNum(0, this.viewValue.height), 1, 0, 2 * Math.PI);
            ctx.fill();
        }
    }

    validate(code) {
        code = code.toLowerCase();
        const v_code = this.viewValue.code.toLowerCase();

        if (code === v_code) {
            return true;
        }else {
            this.refresh();
        }
    }

    getAllLetter() {
        const letterStr = 'a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z';
        return letterStr.split(',');
    }

    // 生成一个随机颜色
    randomColor(min, max) {
        const r = this.randomNum(min, max);
        const g = this.randomNum(min, max);
        const b = this.randomNum(min, max);
        return 'rgb(' + r + ',' + g + ',' + b + ')';
    }

    randomNum(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }

}
