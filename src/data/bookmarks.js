export const defaultBookmarks = [
    {
        id: 1712345678901,
        title:"Hearty Bulgarian Bean Soup Recipe",
        url:"https://www.chasingthedonkey.com/bulgarian-bean-soup-recipe-bob-chorba/",
        category:"recipes",
    },

{
        id:1712345678902,
        title:"Code Pip",
        url:"codepip.com",
        category:"study tools",
    },

{
        id:17123456789013,
        title:"Donjon",
        url:"https://donjon.bin.sh/",
        category:"ttrgph resources",
    },


];
//for easy copy/pasting
// {
//         id:,
//         title:,
//         url:,
//         category:,
//     }

//load local data OR defaults if bitch is empty
const savedData = localStorage.getItem("my_bookmarks");
export const newBookmark = savedData ? JSON.parse(savedData) : defaultBookmarks;

//save to local

export function saveBookmarks(){
    localStorage.setItem("my_bookmarks", JSON.stringify(newBookmark));
}
