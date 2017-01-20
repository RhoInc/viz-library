import examples from '../data/examples.js'
import buildFilters from './buildFilters.js'
import buildExampleList from './buildExampleList.js'

console.log(examples)      
buildFilters(examples,["repository","technology"],".controls")
buildExampleList(examples,".examples")