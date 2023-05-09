import * as rssParser from 'react-native-rss-parser';
import { ErrorApi } from './errorGeneralApi';
import { htmlDecode } from '../imports/libs/htmlDecode';

export const rssApi = async (url: string) => {
    try {
         const response = await fetch(url);
         const responseData = await response.text();
         const rss = await rssParser.parse(responseData);
         return decodeHtmlRss(rss.items);
     } catch (error: any) {
         new ErrorApi(
             rssApi.name,
             `Não foi possivel recuperar o feed de notícias: ${error.message}`
         );
     }
 }

 const decodeHtmlRss = (items: rssParser.FeedItem[]) => {
     items.forEach((item)=> {
            item.title = htmlDecode(item.title);
            item.description = htmlDecode(item.description);
            item.content = htmlDecode(item.content)
    })

    return items;
 }