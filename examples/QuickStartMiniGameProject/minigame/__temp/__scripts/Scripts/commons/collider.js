"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var COLLIDE_STATE = {
    NO: 0,
    INTERSECT: 1,
    INSIDE: 2,
};
var isIntersected = function (arr1, arr2) {
    for (var i = 0; i < arr1.length; i++) {
        for (var j = 0; j < arr2.length; j++) {
            if (arr1[i] === arr2[j]) {
                return true;
            }
        }
    }
    return false;
};
var Collider = (function () {
    function Collider() {
        this.updateNum = 0;
        this.state = {
            x: COLLIDE_STATE.NO,
            y: COLLIDE_STATE.NO,
            z: COLLIDE_STATE.NO,
        };
        this.compMap = new Map();
        this.groupPair = [];
    }
    Collider.prototype.onUpdate = function (dt) {
        this.updateNum++;
        if (this.updateNum % 3 === 0) {
            this._walkComp();
        }
    };
    Collider.prototype.watchGroup = function (group1, group2) {
        this.groupPair.push([group1, group2]);
    };
    Collider.prototype.watch = function (comp, groups) {
        if (groups === void 0) { groups = []; }
        var g = this.compMap.get(comp);
        if (g) {
            groups = groups.concat(g);
        }
        this.compMap.set(comp, groups);
    };
    Collider.prototype.unwatch = function (comp) {
        this.compMap.delete(comp);
    };
    Collider.prototype._walkComp = function () {
        var _this = this;
        var triggerComps = [];
        this.groupPair.forEach(function (pair) {
            var g1 = pair[0];
            var g2 = pair[1];
            _this.compMap.forEach(function (groups1, comp1) {
                if (!comp1) {
                    return;
                }
                _this.compMap.forEach(function (groups2, comp2) {
                    if (!comp2) {
                        return;
                    }
                    if (comp1 === comp2) {
                        return;
                    }
                    if ((groups1.indexOf(g1) > -1 && groups2.indexOf(g2) > -1)
                        ||
                            (groups1.indexOf(g2) > -1 && groups2.indexOf(g1) > -1)) {
                        if (_this._isCollided(comp1, comp2)) {
                            triggerComps.push([comp1, comp2]);
                        }
                    }
                });
            });
        });
        triggerComps.forEach(function (comps) {
            comps[0].onCollide && comps[0].onCollide(comps[1]);
        });
    };
    Collider.prototype._isCollided = function (comp1, comp2) {
        var p1 = comp1.entity.transform.worldPosition;
        var p2 = comp2.entity.transform.worldPosition;
        var b1 = comp1.bound;
        var b2 = comp2.bound;
        this.state = {
            x: COLLIDE_STATE.NO,
            y: COLLIDE_STATE.NO,
            z: COLLIDE_STATE.NO,
        };
        for (var k in this.state) {
            var front1 = p1[k] + b1[k];
            var back1 = p1[k] - b1[k];
            var front2 = p2[k] + b2[k];
            var back2 = p2[k] - b2[k];
            if ((front1 >= back2 && back1 < back2) ||
                (back1 <= front2 && front1 > front2)) {
                this.state[k] = COLLIDE_STATE.INTERSECT;
            }
            if (front1 <= front2 &&
                back1 >= back2) {
                this.state[k] = COLLIDE_STATE.INSIDE;
            }
            if (this.state[k] === COLLIDE_STATE.NO) {
                return false;
            }
        }
        return this.state.x && this.state.y && this.state.z;
    };
    return Collider;
}());
exports.default = new Collider();
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlNjcmlwdHMvY29tbW9ucy9jb2xsaWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLElBQU0sYUFBYSxHQUFHO0lBQ3BCLEVBQUUsRUFBRSxDQUFDO0lBQ0wsU0FBUyxFQUFFLENBQUM7SUFDWixNQUFNLEVBQUUsQ0FBQztDQUNWLENBQUM7QUFDRixJQUFNLGFBQWEsR0FBRyxVQUFDLElBQUksRUFBRSxJQUFJO0lBQy9CLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ3BDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3BDLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRTtnQkFDdkIsT0FBTyxJQUFJLENBQUM7YUFDYjtTQUNGO0tBQ0Y7SUFDRCxPQUFPLEtBQUssQ0FBQztBQUNmLENBQUMsQ0FBQztBQUVGO0lBQUE7UUFDRSxjQUFTLEdBQUcsQ0FBQyxDQUFDO1FBQ2QsVUFBSyxHQUFHO1lBQ04sQ0FBQyxFQUFFLGFBQWEsQ0FBQyxFQUFFO1lBQ25CLENBQUMsRUFBRSxhQUFhLENBQUMsRUFBRTtZQUNuQixDQUFDLEVBQUUsYUFBYSxDQUFDLEVBQUU7U0FDcEIsQ0FBQztRQUVGLFlBQU8sR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFDO1FBQ3BCLGNBQVMsR0FBRyxFQUFFLENBQUM7SUE2RmpCLENBQUM7SUEzRkMsMkJBQVEsR0FBUixVQUFTLEVBQUU7UUFDVCxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFFakIsSUFBSSxJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDNUIsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1NBQ2xCO0lBQ0gsQ0FBQztJQUVELDZCQUFVLEdB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Q0FBQztJQUN0RCxDQUFDO0lBQ0gsZUFBQztBQUFELENBdEdBLEFBc0dDLElBQUE7QUFFRCxrQkFBZSxJQUFJLFFBQVEsRUFBRSxDQUFDIiwiZmlsZSI6IlNjcmlwdHMvY29tbW9ucy9jb2xsaWRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IENPTExJREVfU1RBVEUgPSB7XG4gIE5POiAwLCAvLyDmsqHnorDmkp5cbiAgSU5URVJTRUNUOiAxLCAvLyDnm7jkuqRcbiAgSU5TSURFOiAyLCAvLyDlnKjlhoVcbn07XG5jb25zdCBpc0ludGVyc2VjdGVkID0gKGFycjEsIGFycjIpID0+IHtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcnIxLmxlbmd0aDsgaSsrKSB7XG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCBhcnIyLmxlbmd0aDsgaisrKSB7XG4gICAgICBpZiAoYXJyMVtpXSA9PT0gYXJyMltqXSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufTtcblxuY2xhc3MgQ29sbGlkZXIge1xuICB1cGRhdGVOdW0gPSAwO1xuICBzdGF0ZSA9IHtcbiAgICB4OiBDT0xMSURFX1NUQVRFLk5PLFxuICAgIHk6IENPTExJREVfU1RBVEUuTk8sXG4gICAgejogQ09MTElERV9TVEFURS5OTyxcbiAgfTtcblxuICBjb21wTWFwID0gbmV3IE1hcCgpOyAvLyBjb21wOiBbZ3JvdXAxLCBncm91cDIsIC4uLl1cbiAgZ3JvdXBQYWlyID0gW107XG4gICAgXG4gIG9uVXBkYXRlKGR0KSB7XG4gICAgdGhpcy51cGRhdGVOdW0rKztcblxuICAgIGlmICh0aGlzLnVwZGF0ZU51bSAlIDMgPT09IDApIHsgLy8g6IqC5rWBXG4gICAgICB0aGlzLl93YWxrQ29tcCgpO1xuICAgIH1cbiAgfVxuXG4gIHdhdGNoR3JvdXAoZ3JvdXAxLCBncm91cDIpIHtcbiAgICB0aGlzLmdyb3VwUGFpci5wdXNoKFtncm91cDEsIGdyb3VwMl0pO1xuICB9XG5cbiAgd2F0Y2goY29tcCwgZ3JvdXBzID0gW10pIHtcbiAgICBjb25zdCBnID0gdGhpcy5jb21wTWFwLmdldChjb21wKTtcbiAgICBpZiAoZykge1xuICAgICAgZ3JvdXBzID0gZ3JvdXBzLmNvbmNhdChnKTtcbiAgICB9XG4gICAgdGhpcy5jb21wTWFwLnNldChjb21wLCBncm91cHMpO1xuICB9XG5cbiAgdW53YXRjaChjb21wKSB7XG4gICAgdGhpcy5jb21wTWFwLmRlbGV0ZShjb21wKTtcbiAgfVxuXG4gIF93YWxrQ29tcCgpIHtcbiAgICBjb25zdCB0cmlnZ2VyQ29tcHMgPSBbXTtcbiAgICB0aGlzLmdyb3VwUGFpci5mb3JFYWNoKChwYWlyKSA9PiB7XG4gICAgICBjb25zdCBnMSA9IHBhaXJbMF07XG4gICAgICBjb25zdCBnMiA9IHBhaXJbMV07XG4gICAgICB0aGlzLmNvbXBNYXAuZm9yRWFjaCgoZ3JvdXBzMSwgY29tcDEpID0+IHtcbiAgICAgICAgaWYgKCFjb21wMSkgeyByZXR1cm47IH1cbiAgICAgICAgdGhpcy5jb21wTWFwLmZvckVhY2goKGdyb3VwczIsIGNvbXAyKSA9PiB7XG4gICAgICAgICAgaWYgKCFjb21wMikgeyByZXR1cm47IH1cbiAgICAgICAgICBpZiAoY29tcDEgPT09IGNvbXAyKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICggLy8g5ZyoZ3JvdXBQYWly5YaF55qE5omN56Kw5pKeXG4gICAgICAgICAgICAoZ3JvdXBzMS5pbmRleE9mKGcxKSA+IC0xICYmIGdyb3VwczIuaW5kZXhPZihnMikgPiAtMSlcbiAgICAgICAgICAgIHx8XG4gICAgICAgICAgICAoZ3JvdXBzMS5pbmRleE9mKGcyKSA+IC0xICYmIGdyb3VwczIuaW5kZXhPZihnMSkgPiAtMSlcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9pc0NvbGxpZGVkKGNvbXAxLCBjb21wMikpIHtcbiAgICAgICAgICAgICAgdHJpZ2dlckNvbXBzLnB1c2goW2NvbXAxLCBjb21wMl0pOyAvLyDlj6rop6blj5Fjb21wMS5vbkNvbGxpZGXlm57osIPvvIxjb21wMueahOS8muWcqOWQjue7remBjeWOhuS4reWkhOeQhuWIsFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICB0cmlnZ2VyQ29tcHMuZm9yRWFjaCgoY29tcHMpID0+IHtcbiAgICAgIGNvbXBzWzBdLm9uQ29sbGlkZSAmJiBjb21wc1swXS5vbkNvbGxpZGUoY29tcHNbMV0pO1xuICAgIH0pO1xuICB9XG5cbiAgX2lzQ29sbGlkZWQoY29tcDEsIGNvbXAyKSB7XG4gICAgY29uc3QgcDEgPSBjb21wMS5lbnRpdHkudHJhbnNmb3JtLndvcmxkUG9zaXRpb247XG4gICAgY29uc3QgcDIgPSBjb21wMi5lbnRpdHkudHJhbnNmb3JtLndvcmxkUG9zaXRpb247XG4gICAgY29uc3QgYjEgPSBjb21wMS5ib3VuZDtcbiAgICBjb25zdCBiMiA9IGNvbXAyLmJvdW5kO1xuXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIHg6IENPTExJREVfU1RBVEUuTk8sXG4gICAgICB5OiBDT0xMSURFX1NUQVRFLk5PLFxuICAgICAgejogQ09MTElERV9TVEFURS5OTyxcbiAgICB9O1xuICAgIGZvciAobGV0IGsgaW4gdGhpcy5zdGF0ZSkge1xuICAgICAgY29uc3QgZnJvbnQxID0gcDFba10gKyBiMVtrXTsgLy8gcOeCueeahOWJjei+ueeVjFxuICAgICAgY29uc3QgYmFjazEgPSBwMVtrXSAtIGIxW2tdOyAvLyBw54K555qE5ZCO6L6555WMXG4gICAgICBjb25zdCBmcm9udDIgPSBwMltrXSArIGIyW2tdO1xuICAgICAgY29uc3QgYmFjazIgPSBwMltrXSAtIGIyW2tdO1xuICAgICAgaWYgKFxuICAgICAgICAoZnJvbnQxID49IGJhY2syICYmIGJhY2sxIDwgYmFjazIpIHx8XG4gICAgICAgIChiYWNrMSA8PSBmcm9udDIgJiYgZnJvbnQxID4gZnJvbnQyKVxuICAgICAgKSB7XG4gICAgICAgIHRoaXMuc3RhdGVba10gPSBDT0xMSURFX1NUQVRFLklOVEVSU0VDVDtcbiAgICAgIH1cblxuICAgICAgaWYgKFxuICAgICAgICBmcm9udDEgPD0gZnJvbnQyICYmXG4gICAgICAgIGJhY2sxID49IGJhY2syXG4gICAgICApIHtcbiAgICAgICAgdGhpcy5zdGF0ZVtrXSA9IENPTExJREVfU1RBVEUuSU5TSURFO1xuICAgICAgfVxuICAgICAgXG4gICAgICBpZiAodGhpcy5zdGF0ZVtrXSA9PT0gQ09MTElERV9TVEFURS5OTykge1xuICAgICAgICByZXR1cm4gZmFsc2U7IC8vIOS4ieS4qui9tOmDveacieeisOaSnuaJjeeul+eisOaSnu+8jOiLpeWFtuS4reS4gOS4quayoeeisO+8jOmCo+ebtOaOpei/lOWbnu+8jOiKgue6puiuoeeul1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIGNvbnNvbGUubG9nKHN0YXRlKTtcbiAgICByZXR1cm4gdGhpcy5zdGF0ZS54ICYmIHRoaXMuc3RhdGUueSAmJiB0aGlzLnN0YXRlLno7IC8vIOS4ieS4qui9tOmDveacieeisOaSnuaJjeeul+eisOaSnlxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IG5ldyBDb2xsaWRlcigpOyJdfQ==
