import '../common'

function testDynamicImport () {
  return import(/* webpackChunkName: "dynamic-chunk" */ '../dynamic-import').then(({default: value}) => {
    console.log(value)
    return value
  }).catch(err => {
    console.error(err)
    console.log('something wrong')
  })
}

let btn = document.getElementById('btn')

btn.addEventListener('click', function (event) {
  event.preventDefault();
  event.stopPropagation();
  testDynamicImport().then(value => {
    console.log(value)
    btn.removeEventListener('click', function () {
      console.log('has been removed')
    });
    btn = null
  })
})