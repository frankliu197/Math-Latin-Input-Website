import BasicLatin from "../symbols/BasicLatin.json" 
import * as Collections from 'typescript-collections';
import Character from './Character';
import Fuse from 'fuse.js'
import lunr from 'lunr'
const options = {
    threshold: "0.1",
    keys: [
        "name"
    ]
}
const index = lunr(function(){
    // @ts-expect-error: javascript
    this.field('name')
    // @ts-expect-error: javascript
    this.ref('unicode')
    
    BasicLatin.forEach(function(doc){
        // @ts-expect-error: javascript
        this.add(doc)
        // @ts-expect-error: javascript
    }, this)
})

//const fuse = new Fuse(BasicLatin, options);
export default function(search : string) : Set<Character> { //: Character[] cast into character
    console.log(index.search(search))
    const suggestions = new Set<Character>();
    //search word corospondence only if length > 3
    /*const suggestions = new Set<Character>();
    if (search.length > 3) {
        const terms = search.toLocaleUpperCase().split("_")
        for (const i of BasicLatin){
            if (terms.every(term => i.name.includes(term))){
                suggestions.add(i as unknown as Character)
            }
        }
    } else {
        return suggestions
    }*/
    return suggestions
}