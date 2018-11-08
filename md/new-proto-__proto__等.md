# new , 继承 , 原型链与一些写法的区别

## 混乱的 \_\_proto\_\_ 与 prototype　
    
* 为了区分 \_\_proto\_\_ 与 prototype 我们先约定以以下方式称呼它们:    

    - \_\_proto\_\_  : 基本原型  
    - prototype      : 函数原型
    
    
* \_\_proto\_\_ : js 中所有东西都是对象 , 而所有的对象都具有 基本原型(\_\_proto\_\_) , 一层层连接起来 . 直到 最上层的 Object (事实上,好像在目前的版本中,Object 之上还有 apply ) 的 \_\_proto\_\_ 为空.


* prototype: 函数原型. js 中每个函数都有函数原型属性.该属性包含两部分基本内容:  
    1. 构造函数.构造函数是一个指针,指向函数自身.  
    2. 基础原型.同其它类型数据一样.指向自身的原型.  
    
## new 做了什么

1. 改 __proto__ 就行了...
2. 改向哪，要继承的类的 __proto__ 不不，那样会略过要继承的类。改向 prototype ？虽然只剩下这么一个选项了，但总感觉有点不对……  
没错，是有某些地方不对，多了一层，但因为函数也是 object ，所以多出来的是个指针，完全没有影响。

## this , prototype 的区别

``` js
function A(){
    this.name1 = 'name1';
    A.prototype.name2 = 'name2';
}
A.prototype.name3 = 'name3'
```
上面这段代码中 this 和 prototype 有什么不同？

1. this 无法写在构造函数之外，通常放在内部，以访问模似 private 访问权限的属性
2. 继承之后属性挂载的地方不同， prototype 挂在继承来的地方,需要沿原型链查找多次,而 this 则挂在当前当前对象的基础原型上(这也是为什么 delete 删除类的属性时总感觉删不掉,因为当前对象并不存在该属性).  
猜猜以下代码输出什么?
``` js
function A() {
    this.name1 = 'name1';
    A.prototype.name2 = 'name2';
}
A.prototype.name3 = 'name3'
let B = function () { };
B.prototype = new A();
B.prototype.name2 = 'b2';
var a = new A();
var b = new B();

console.log(b.name2);
delete b.__proto__.name2;
console.log(b.name2);
```