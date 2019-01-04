import '../common';
import test from '@test/test'
/* 注释注释注释注释注释 */
// 注释别删
function createDiv () {
  let element = document.createElement('div')

  element.innerHTML = _.join(['wepack', 'test'], ' ')

  return element
}

console.log('test create div')
document.body.appendChild(createDiv())
