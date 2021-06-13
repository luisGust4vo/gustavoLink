import AsyncStorage from '@react-native-async-storage/async-storage';

// buscar os links salvos
export async function getLinksSave(key){
    const myLinks = await AsyncStorage.getItem(key)
    let linkSaves = JSON.parse(myLinks) || [];

    return linkSaves;
}

//salvar link
export async function saveLink(key,newLink){
    let linksStored = await getLinksSave(key);

    //se tiver algum link salvo / ignorar...
    const hasLink = linksStored.some(link=> link.id === newLink.id);
    if(hasLink){
        console.log('ESSE LINK JA EXISTE NA LISTA');
        return; //stop
    }
    linksStored.push(newLink)
    await AsyncStorage.setItem(key, JSON.stringify(linksStored))
    console.log('LINKSALVO MEU BOM');
}

//deletar algum link
export async function deleteLink(link, id){

}