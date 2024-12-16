export const detailsShorter = (str='', limit=130) => {
    let shortStr = str.slice(0, limit);
    const toRemove = ['<br>', '<strong>', '</strong>', '<ul>', '</ul>', '<li>', '</li>', '<ol>', '</ol>', '<hr>'];

    let i=0;
    while(true){
        const _toRemove = toRemove[i];
        const tagIndex = shortStr.indexOf(_toRemove);
        if(tagIndex>-1){
            shortStr = shortStr.replace(_toRemove, '');
        }else{
            i++;
            if(i===toRemove.length)break;
        }
    }

    return shortStr+'...';
}