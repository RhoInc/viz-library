import examples from '../data/examples_demo.js'
import buildFilters from './buildFilters.js'
import buildExampleList from './buildExampleList.js'

console.log(examples)      
buildFilters(examples,["repository","technology"],".controls")
buildExampleList(examples,".examples")