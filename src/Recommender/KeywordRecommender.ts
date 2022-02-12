
import {BPlusTree} from "./BPlusTree"
import Character from "./Character"

import { valueCountPriority, combinePriority , stringMatchPriority} from "./Priority"


export class KeywordRecommender {
	tree: BPlusTree
	constructor(){
		this.tree = new BPlusTree()
	}
	addSymbolSet(characters: Character[]) : void{
		for (const c of characters){
			for (const k of c.name.split(" ")){
				this.tree.insert(k, c)
			}
		}
		this.tree.updatePriorities()
	}	
	suggest(search: string) : Map<Character, number>{
		const terms = search.split(" ");

		//add only matching elements in prev map and character set from this search time to nextMap
		//this way next map matches all search terms
		let map = this.tree.getCharacterSet(terms[0])
		let nextMap = new Map<Character, number>()
		for (let i = 0; i < terms.length; i++){
			for (const [c, p] of this.tree.getCharacterSet(terms[i]).entries()){
				if (map.has(c)){
          nextMap.set(c, combinePriority(p, map.get(c)!)) 
        }
			}
			map = nextMap
			nextMap = new Map<Character, number>()
		}
		//let start = new Date().getTime();

		
		//const end = new Date().getTime();
		//const time = end - start;
		//console.log(start)
		//console.log('Execution time (ms): ' + time);
		//todo sort
		return map
	}
}