import{N as E,d as j,O as T,Q as pe,R as Z,S as ue,U as Pe,b as A,D as _e,g as L,V as B,W as Be,E as Ae,l as p,X as me,Y as ze,Z as ve,$ as ee,a0 as te,r as C,a1 as De,a2 as Le,a3 as fe,w as Y,a4 as ce,o as he,a5 as Ce,a6 as M,a7 as W,a8 as ke,I as xe,a9 as We,aa as je,F as be,ab as K,ac as ye,ad as Re,ae as Ve,af as Fe,ag as de,ah as qe,ai as Ge,aj as Ie,h as Ue,ak as He,s as Se,c as G,e as U,n as ne,j as Ee,t as Ze,al as Ke,am as Me,an as Qe,f as Q,u as Xe,p as Ye,k as Je,_ as et}from"./index-68cfd1b4.js";import"./el-tooltip-4ed993c7.js";import{T as tt,_ as nt,f as ot}from"./index-7c133fff.js";const J=function(e,n,...t){let l;n.includes("mouse")||n.includes("click")?l="MouseEvents":n.includes("key")?l="KeyboardEvent":l="HTMLEvents";const u=document.createEvent(l);return u.initEvent(n,...t),e.dispatchEvent(u),e};let at=class{constructor(n,t){this.parent=n,this.domNode=t,this.subIndex=0,this.subIndex=0,this.init()}init(){this.subMenuItems=this.domNode.querySelectorAll("li"),this.addListeners()}gotoSubIndex(n){n===this.subMenuItems.length?n=0:n<0&&(n=this.subMenuItems.length-1),this.subMenuItems[n].focus(),this.subIndex=n}addListeners(){const n=this.parent.domNode;Array.prototype.forEach.call(this.subMenuItems,t=>{t.addEventListener("keydown",l=>{let u=!1;switch(l.code){case E.down:{this.gotoSubIndex(this.subIndex+1),u=!0;break}case E.up:{this.gotoSubIndex(this.subIndex-1),u=!0;break}case E.tab:{J(n,"mouseleave");break}case E.enter:case E.space:{u=!0,l.currentTarget.click();break}}return u&&(l.preventDefault(),l.stopPropagation()),!1})})}},st=class{constructor(n,t){this.domNode=n,this.submenu=null,this.submenu=null,this.init(t)}init(n){this.domNode.setAttribute("tabindex","0");const t=this.domNode.querySelector(`.${n}-menu`);t&&(this.submenu=new at(this,t)),this.addListeners()}addListeners(){this.domNode.addEventListener("keydown",n=>{let t=!1;switch(n.code){case E.down:{J(n.currentTarget,"mouseenter"),this.submenu&&this.submenu.gotoSubIndex(0),t=!0;break}case E.up:{J(n.currentTarget,"mouseenter"),this.submenu&&this.submenu.gotoSubIndex(this.submenu.subMenuItems.length-1),t=!0;break}case E.tab:{J(n.currentTarget,"mouseleave");break}case E.enter:case E.space:{t=!0,n.currentTarget.click();break}}t&&n.preventDefault()})}},lt=class{constructor(n,t){this.domNode=n,this.init(t)}init(n){const t=this.domNode.childNodes;Array.from(t).forEach(l=>{l.nodeType===1&&new st(l,n)})}};const ut=j({name:"ElMenuCollapseTransition",setup(){const e=T("menu");return{listeners:{onBeforeEnter:t=>t.style.opacity="0.2",onEnter(t,l){Z(t,`${e.namespace.value}-opacity-transition`),t.style.opacity="1",l()},onAfterEnter(t){ue(t,`${e.namespace.value}-opacity-transition`),t.style.opacity=""},onBeforeLeave(t){t.dataset||(t.dataset={}),Pe(t,e.m("collapse"))?(ue(t,e.m("collapse")),t.dataset.oldOverflow=t.style.overflow,t.dataset.scrollWidth=t.clientWidth.toString(),Z(t,e.m("collapse"))):(Z(t,e.m("collapse")),t.dataset.oldOverflow=t.style.overflow,t.dataset.scrollWidth=t.clientWidth.toString(),ue(t,e.m("collapse"))),t.style.width=`${t.scrollWidth}px`,t.style.overflow="hidden"},onLeave(t){Z(t,"horizontal-collapse-transition"),t.style.width=`${t.dataset.scrollWidth}px`}}}}});function rt(e,n,t,l,u,y){return A(),_e(Ae,Be({mode:"out-in"},e.listeners),{default:L(()=>[B(e.$slots,"default")]),_:3},16)}var it=pe(ut,[["render",rt],["__file","/home/runner/work/element-plus/element-plus/packages/components/menu/src/menu-collapse-transition.vue"]]);function Te(e,n){const t=p(()=>{let u=e.parent;const y=[n.value];for(;u.type.name!=="ElMenu";)u.props.index&&y.unshift(u.props.index),u=u.parent;return y});return{parentMenu:p(()=>{let u=e.parent;for(;u&&!["ElMenu","ElSubMenu"].includes(u.type.name);)u=u.parent;return u}),indexPath:t}}function ct(e){return p(()=>{const t=e.backgroundColor;return t?new tt(t).shade(20).toString():""})}const $e=(e,n)=>{const t=T("menu");return p(()=>t.cssVarBlock({"text-color":e.textColor||"","hover-text-color":e.textColor||"","bg-color":e.backgroundColor||"","hover-bg-color":ct(e).value||"","active-color":e.activeTextColor||"",level:`${n}`}))},dt=me({index:{type:String,required:!0},showTimeout:{type:Number,default:300},hideTimeout:{type:Number,default:300},popperClass:String,disabled:Boolean,popperAppendToBody:{type:Boolean,default:void 0},teleported:{type:Boolean,default:void 0},popperOffset:{type:Number,default:6},expandCloseIcon:{type:K},expandOpenIcon:{type:K},collapseCloseIcon:{type:K},collapseOpenIcon:{type:K}}),X="ElSubMenu";var ge=j({name:X,props:dt,setup(e,{slots:n,expose:t}){ze({from:"popper-append-to-body",replacement:"teleported",scope:X,version:"2.3.0",ref:"https://element-plus.org/en-US/component/menu.html#submenu-attributes"},p(()=>e.popperAppendToBody!==void 0));const l=ve(),{indexPath:u,parentMenu:y}=Te(l,p(()=>e.index)),c=T("menu"),v=T("sub-menu"),s=ee("rootMenu");s||te(X,"can not inject root menu");const m=ee(`subMenu:${y.value.uid}`);m||te(X,"can not inject sub menu");const f=C({}),g=C({});let _;const $=C(!1),oe=C(),H=C(null),N=p(()=>o.value==="horizontal"&&O.value?"bottom-start":"right-start"),z=p(()=>o.value==="horizontal"&&O.value||o.value==="vertical"&&!s.props.collapse?e.expandCloseIcon&&e.expandOpenIcon?k.value?e.expandOpenIcon:e.expandCloseIcon:De:e.collapseCloseIcon&&e.collapseOpenIcon?k.value?e.collapseOpenIcon:e.collapseCloseIcon:Le),O=p(()=>m.level===0),R=p(()=>{var i;const d=(i=e.teleported)!=null?i:e.popperAppendToBody;return d===void 0?O.value:d}),ae=p(()=>s.props.collapse?`${c.namespace.value}-zoom-in-left`:`${c.namespace.value}-zoom-in-top`),se=p(()=>o.value==="horizontal"&&O.value?["bottom-start","bottom-end","top-start","top-end","right-start","left-start"]:["right-start","left-start","bottom-start","bottom-end","top-start","top-end"]),k=p(()=>s.openedMenus.includes(e.index)),P=p(()=>{let i=!1;return Object.values(f.value).forEach(d=>{d.active&&(i=!0)}),Object.values(g.value).forEach(d=>{d.active&&(i=!0)}),i}),V=p(()=>s.props.backgroundColor||""),F=p(()=>s.props.activeTextColor||""),D=p(()=>s.props.textColor||""),o=p(()=>s.props.mode),a=fe({index:e.index,indexPath:u,active:P}),r=p(()=>o.value!=="horizontal"?{color:D.value}:{borderBottomColor:P.value?s.props.activeTextColor?F.value:"":"transparent",color:P.value?F.value:D.value}),I=()=>{var i,d,h;return(h=(d=(i=H.value)==null?void 0:i.popperRef)==null?void 0:d.popperInstanceRef)==null?void 0:h.destroy()},b=i=>{i||I()},x=()=>{s.props.menuTrigger==="hover"&&s.props.mode==="horizontal"||s.props.collapse&&s.props.mode==="vertical"||e.disabled||s.handleSubMenuClick({index:e.index,indexPath:u.value,active:P.value})},S=(i,d=e.showTimeout)=>{var h;i.type!=="focus"&&(s.props.menuTrigger==="click"&&s.props.mode==="horizontal"||!s.props.collapse&&s.props.mode==="vertical"||e.disabled||(m.mouseInChild.value=!0,_==null||_(),{stop:_}=ye(()=>{s.openMenu(e.index,u.value)},d),R.value&&((h=y.value.vnode.el)==null||h.dispatchEvent(new MouseEvent("mouseenter")))))},w=(i=!1)=>{var d,h;s.props.menuTrigger==="click"&&s.props.mode==="horizontal"||!s.props.collapse&&s.props.mode==="vertical"||(_==null||_(),m.mouseInChild.value=!1,{stop:_}=ye(()=>!$.value&&s.closeMenu(e.index,u.value),e.hideTimeout),R.value&&i&&((d=l.parent)==null?void 0:d.type.name)==="ElSubMenu"&&((h=m.handleMouseleave)==null||h.call(m,!0)))};Y(()=>s.props.collapse,i=>b(Boolean(i)));{const i=h=>{g.value[h.index]=h},d=h=>{delete g.value[h.index]};ce(`subMenu:${l.uid}`,{addSubMenu:i,removeSubMenu:d,handleMouseleave:w,mouseInChild:$,level:m.level+1})}return t({opened:k}),he(()=>{s.addSubMenu(a),m.addSubMenu(a)}),Ce(()=>{m.removeSubMenu(a),s.removeSubMenu(a)}),()=>{var i;const d=[(i=n.title)==null?void 0:i.call(n),M(ke,{class:v.e("icon-arrow"),style:{transform:k.value?e.expandCloseIcon&&e.expandOpenIcon||e.collapseCloseIcon&&e.collapseOpenIcon&&s.props.collapse?"none":"rotateZ(180deg)":"none"}},{default:()=>W(z.value)?M(l.appContext.components[z.value]):M(z.value)})],h=$e(s.props,m.level+1),Oe=s.isMenuPopup?M(xe,{ref:H,visible:k.value,effect:"light",pure:!0,offset:e.popperOffset,showArrow:!1,persistent:!0,popperClass:e.popperClass,placement:N.value,teleported:R.value,fallbackPlacements:se.value,transition:ae.value,gpuAcceleration:!1},{content:()=>{var q;return M("div",{class:[c.m(o.value),c.m("popup-container"),e.popperClass],onMouseenter:le=>S(le,100),onMouseleave:()=>w(!0),onFocus:le=>S(le,100)},[M("ul",{class:[c.b(),c.m("popup"),c.m(`popup-${N.value}`)],style:h.value},[(q=n.default)==null?void 0:q.call(n)])])},default:()=>M("div",{class:v.e("title"),style:[r.value,{backgroundColor:V.value}],onClick:x},d)}):M(be,{},[M("div",{class:v.e("title"),style:[r.value,{backgroundColor:V.value}],ref:oe,onClick:x},d),M(nt,{},{default:()=>{var q;return We(M("ul",{role:"menu",class:[c.b(),c.m("inline")],style:h.value},[(q=n.default)==null?void 0:q.call(n)]),[[je,k.value]])}})]);return M("li",{class:[v.b(),v.is("active",P.value),v.is("opened",k.value),v.is("disabled",e.disabled)],role:"menuitem",ariaHaspopup:!0,ariaExpanded:k.value,onMouseenter:S,onMouseleave:()=>w(!0),onFocus:S},[Oe])}}});const pt=me({mode:{type:String,values:["horizontal","vertical"],default:"vertical"},defaultActive:{type:String,default:""},defaultOpeneds:{type:de(Array),default:()=>qe([])},uniqueOpened:Boolean,router:Boolean,menuTrigger:{type:String,values:["hover","click"],default:"hover"},collapse:Boolean,backgroundColor:String,textColor:String,activeTextColor:String,collapseTransition:{type:Boolean,default:!0},ellipsis:{type:Boolean,default:!0},popperEffect:{type:String,values:["dark","light"],default:"dark"}}),re=e=>Array.isArray(e)&&e.every(n=>W(n)),mt={close:(e,n)=>W(e)&&re(n),open:(e,n)=>W(e)&&re(n),select:(e,n,t,l)=>W(e)&&re(n)&&Ge(t)&&(l===void 0||l instanceof Promise)};var vt=j({name:"ElMenu",props:pt,emits:mt,setup(e,{emit:n,slots:t,expose:l}){const u=ve(),y=u.appContext.config.globalProperties.$router,c=C(),v=T("menu"),s=T("sub-menu"),m=C(-1),f=C(e.defaultOpeneds&&!e.collapse?e.defaultOpeneds.slice(0):[]),g=C(e.defaultActive),_=C({}),$=C({}),oe=p(()=>e.mode==="horizontal"||e.mode==="vertical"&&e.collapse),H=()=>{const o=g.value&&_.value[g.value];if(!o||e.mode==="horizontal"||e.collapse)return;o.indexPath.forEach(r=>{const I=$.value[r];I&&N(r,I.indexPath)})},N=(o,a)=>{f.value.includes(o)||(e.uniqueOpened&&(f.value=f.value.filter(r=>a.includes(r))),f.value.push(o),n("open",o,a))},z=o=>{const a=f.value.indexOf(o);a!==-1&&f.value.splice(a,1)},O=(o,a)=>{z(o),n("close",o,a)},R=({index:o,indexPath:a})=>{f.value.includes(o)?O(o,a):N(o,a)},ae=o=>{(e.mode==="horizontal"||e.collapse)&&(f.value=[]);const{index:a,indexPath:r}=o;if(!(Ie(a)||Ie(r)))if(e.router&&y){const I=o.route||a,b=y.push(I).then(x=>(x||(g.value=a),x));n("select",a,r,{index:a,indexPath:r,route:I},b)}else g.value=a,n("select",a,r,{index:a,indexPath:r})},se=o=>{const a=_.value,r=a[o]||g.value&&a[g.value]||a[e.defaultActive];r?g.value=r.index:g.value=o},k=()=>{var o,a;if(!c.value)return-1;const r=Array.from((a=(o=c.value)==null?void 0:o.childNodes)!=null?a:[]).filter(d=>d.nodeName!=="#text"||d.nodeValue),I=64,b=Number.parseInt(getComputedStyle(c.value).paddingLeft,10),x=Number.parseInt(getComputedStyle(c.value).paddingRight,10),S=c.value.clientWidth-b-x;let w=0,i=0;return r.forEach((d,h)=>{w+=d.offsetWidth||0,w<=S-I&&(i=h+1)}),i===r.length?-1:i},P=(o,a=33.34)=>{let r;return()=>{r&&clearTimeout(r),r=setTimeout(()=>{o()},a)}};let V=!0;const F=()=>{const o=()=>{m.value=-1,Ue(()=>{m.value=k()})};V?o():P(o)(),V=!1};Y(()=>e.defaultActive,o=>{_.value[o]||(g.value=""),se(o)}),Y(()=>e.collapse,o=>{o&&(f.value=[])}),Y(_.value,H);let D;Re(()=>{e.mode==="horizontal"&&e.ellipsis?D=Ve(c,F).stop:D==null||D()});{const o=b=>{$.value[b.index]=b},a=b=>{delete $.value[b.index]};ce("rootMenu",fe({props:e,openedMenus:f,items:_,subMenus:$,activeIndex:g,isMenuPopup:oe,addMenuItem:b=>{_.value[b.index]=b},removeMenuItem:b=>{delete _.value[b.index]},addSubMenu:o,removeSubMenu:a,openMenu:N,closeMenu:O,handleMenuItemClick:ae,handleSubMenuClick:R})),ce(`subMenu:${u.uid}`,{addSubMenu:o,removeSubMenu:a,mouseInChild:C(!1),level:0})}return he(()=>{e.mode==="horizontal"&&new lt(u.vnode.el,v.namespace.value)}),l({open:a=>{const{indexPath:r}=$.value[a];r.forEach(I=>N(I,r))},close:z,handleResize:F}),()=>{var o,a;let r=(a=(o=t.default)==null?void 0:o.call(t))!=null?a:[];const I=[];if(e.mode==="horizontal"&&c.value){const S=ot(r),w=m.value===-1?S:S.slice(0,m.value),i=m.value===-1?[]:S.slice(m.value);i!=null&&i.length&&e.ellipsis&&(r=w,I.push(M(ge,{index:"sub-menu-more",class:s.e("hide-arrow")},{title:()=>M(ke,{class:s.e("icon-more")},{default:()=>M(Fe)}),default:()=>i})))}const b=$e(e,0),x=M("ul",{key:String(e.collapse),role:"menubar",ref:c,style:b.value,class:{[v.b()]:!0,[v.m(e.mode)]:!0,[v.m("collapse")]:e.collapse}},[...r,...I]);return e.collapseTransition&&e.mode==="vertical"?M(it,()=>x):x}}});const ft=me({index:{type:de([String,null]),default:null},route:{type:de([String,Object])},disabled:Boolean}),ht={click:e=>W(e.index)&&Array.isArray(e.indexPath)},ie="ElMenuItem",bt=j({name:ie,components:{ElTooltip:xe},props:ft,emits:ht,setup(e,{emit:n}){const t=ve(),l=ee("rootMenu"),u=T("menu"),y=T("menu-item");l||te(ie,"can not inject root menu");const{parentMenu:c,indexPath:v}=Te(t,He(e,"index")),s=ee(`subMenu:${c.value.uid}`);s||te(ie,"can not inject sub menu");const m=p(()=>e.index===l.activeIndex),f=fe({index:e.index,indexPath:v,active:m}),g=()=>{e.disabled||(l.handleMenuItemClick({index:e.index,indexPath:v.value,route:e.route}),n("click",f))};return he(()=>{s.addSubMenu(f),l.addMenuItem(f)}),Ce(()=>{s.removeSubMenu(f),l.removeMenuItem(f)}),{parentMenu:c,rootMenu:l,active:m,nsMenu:u,nsMenuItem:y,handleClick:g}}});function Mt(e,n,t,l,u,y){const c=Se("el-tooltip");return A(),G("li",{class:ne([e.nsMenuItem.b(),e.nsMenuItem.is("active",e.active),e.nsMenuItem.is("disabled",e.disabled)]),role:"menuitem",tabindex:"-1",onClick:n[0]||(n[0]=(...v)=>e.handleClick&&e.handleClick(...v))},[e.parentMenu.type.name==="ElMenu"&&e.rootMenu.props.collapse&&e.$slots.title?(A(),_e(c,{key:0,effect:e.rootMenu.props.popperEffect,placement:"right","fallback-placements":["left"],persistent:""},{content:L(()=>[B(e.$slots,"title")]),default:L(()=>[U("div",{class:ne(e.nsMenu.be("tooltip","trigger"))},[B(e.$slots,"default")],2)]),_:3},8,["effect"])):(A(),G(be,{key:1},[B(e.$slots,"default"),B(e.$slots,"title")],64))],2)}var we=pe(bt,[["render",Mt],["__file","/home/runner/work/element-plus/element-plus/packages/components/menu/src/menu-item.vue"]]);const gt={title:String},yt="ElMenuItemGroup",It=j({name:yt,props:gt,setup(){return{ns:T("menu-item-group")}}});function _t(e,n,t,l,u,y){return A(),G("li",{class:ne(e.ns.b())},[U("div",{class:ne(e.ns.e("title"))},[e.$slots.title?B(e.$slots,"title",{key:1}):(A(),G(be,{key:0},[Ee(Ze(e.title),1)],64))],2),U("ul",null,[B(e.$slots,"default")])],2)}var Ne=pe(It,[["render",_t],["__file","/home/runner/work/element-plus/element-plus/packages/components/menu/src/menu-item-group.vue"]]);const Ct=Ke(vt,{MenuItem:we,MenuItemGroup:Ne,SubMenu:ge}),kt=Me(we),xt=Me(Ne);Me(ge);const St=e=>(Ye("data-v-d2693274"),e=e(),Je(),e),Et={class:"home"},Tt={class:"menu"},$t=St(()=>U("h4",null,"大屏管理系统",-1)),wt=j({__name:"admin",setup(e){const n=Qe();return(t,l)=>{const u=kt,y=xt,c=Ct,v=Se("router-view");return A(),G("div",Et,[U("div",Tt,[$t,Q(c,{"background-color":"#304156","active-text-color":"#409eff","text-color":"#fff",router:"","default-active":Xe(n).path},{default:L(()=>[Q(y,null,{default:L(()=>[Q(u,{index:"/admin/kanban"},{default:L(()=>[Ee("模块管理")]),_:1})]),_:1})]),_:1},8,["default-active"])]),Q(v,{class:"content"})])}}});const Dt=et(wt,[["__scopeId","data-v-d2693274"]]);export{Dt as default};