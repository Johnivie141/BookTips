import axios from 'axios';
import LZString from 'lz-string';
const localApiUrl='http://18.220.207.69:3030';

const api = axios.create({
	withCredentials:true
});



export function apiGetAuthorBio(bookid){
	return api.get(localApiUrl +'/api/book/' + bookid + '/authorbio')
		.then(response=>{
                        return response.data;
		})
		.catch(err=>{console.log("ERROR");console.log(err)});
}


export function apiGetBookDescription(bookid){
	return api.get(localApiUrl +'/api/book/' + bookid + '/description')
		.then(response=>{
                        return response.data;
		})
		.catch(err=>console.log(err));
}





export function apiMerriamDictionary(word){
return api.get(localApiUrl + '/api/word/?word=' + word)
	.then(response=>{
		return response.data;
	})
	.catch(err=>console.log(err))


}




export function apiSetCurrent(bookid){
	return api.get(localApiUrl + '/api/book/' +bookid + '/setcurrent')
	          .then(response=>{
		       return response.data;
		  })
	          .catch(err=>console.log(err));
}


export function apiGetCurrent(){
	return api.get(localApiUrl + '/api/current')
	          .then(response=>{
			  console.log("apiGetCurrent ");
			  console.log(response);
			  return response.data;})
                .catch(err=>{console.log(err);})

}


function supports_html5_storage() {
  try {
    return 'localStorage' in window && window['localStorage'] !== null;
  } catch (e) {
    return false;
  }
}
var supportsHtml5Storage=supports_html5_storage();
export function apiDownload(bookid){
	
	return api.get(localApiUrl + '/api/book/' + bookid + '/download')
	.then (response=>{
		console.log(response);
		//localStorage.setItem('book' + bookid,LZString.compressToUTF16(response.data.text));
		//localStorage.setItem('book_spellings' +bookid , LZString.compressToUTF16(JSON.stringify(response.data.spellings)));
		return bookid;
	})
}

export function apiSetLike(bookid,like){
	return api.get(localApiUrl + '/api/setlike?bookid=' + bookid + '&likes=' + like)
	          .then(response=>{
			  return response.data;
		  })
		.catch(err=>{console.log(err); return ''});
}
export function apiGetBooks(bookShelf,filter){
console.log("FILTER IS " +filter);
	switch(filter){
	case 'mine':
			console.log("my books filter " + filter);
          return api.get(localApiUrl + '/api/mybooklist?shelf=' + bookShelf).then(books=>{return books.data}); 
	  default:
			console.log("all books");
	   return api.get(localApiUrl + '/api/booklist?shelf=' + bookShelf)
	     .then(books=>{return books.data});
        }
}

export function apiLogin(){
	           return axios.get(localApiUrl + "/auth")
		     .then(response=>{
			    return response;
		    })
	            .catch(err=>{
			    console.log(err);
		    })
}

export function apiGetUser(){
	// debug try this
	//end debug try this
	return  api.get(localApiUrl  + '/auth/me')
	            .then(response =>{
		     return response;
		    })
	            .catch(err=>{
			    console.log(err)});

}


export function apiGetBookById(id){
	return api.get(localApiUrl + '/api/book/' +id)
	.then (books=>{return books});
}

export function apiGetNextPage(id){

   return api.get(localApiUrl + '/api/book/' + id + '/nextpage')
	.then(response =>{return response.data;});
}
export function apiGetPrevPage(id){
   return api.get(localApiUrl + '/api/book/' + id + '/prevpage')
	.then(response =>{return response.data;});
}





export function apiChangeSpelling(bookid,oldWord,newWord,position,spellings){
	
	console.log("debug inside api spellings2");
	console.log(spellings);
	
	api.post(localApiUrl + '/api/book/' + bookid + '/spelling' ,{oldWord:oldWord,newWord:newWord,position:position}); 

	console.log("debug inside api spellings");
	console.log(spellings);
	spellings.push({
	position:position,
	oldword:oldWord,
	newword:newWord});
	return spellings;
}





export function apiGetSuggestionText(){
    return api.get(localApiUrl + '/api/suggestiontext')
	    .then(text=>{return text.data;});
}
export function apiGetSuggestions(){
	return api.get(localApiUrl + '/api/suggestions')
	   .then (books=>{return books.data});
}

export function apiGetBooksByAuthor(author){
	return axios.get(localApiUrl + '/api/author/:' + author + '/books')
	.then (books=>{return books});
}

