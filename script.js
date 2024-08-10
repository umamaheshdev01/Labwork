function run() {
    const inputHtml = document.getElementById('data').value;
    const outputElement = document.getElementById('Output');
    outputElement.innerHTML = '';

    const tagStack = [];
    const tagRegex = /<\/?([a-zA-Z0-9]+)(\s[^>]*)?>/g;
    let match;
    let errorFound = false;
    const errorList = document.createElement('ul');

    while ((match = tagRegex.exec(inputHtml)) !== null) {
        const tagName = match[1];

        if (!match[0].startsWith('</')) {
            if (!selfClosingTag(tagName)) {
                tagStack.push(tagName);
            }
        } else {
            if (tagStack.length === 0 || tagStack[tagStack.length - 1] !== tagName) {
                errorFound = true;
                const errorItem = document.createElement('li');
                errorItem.textContent = `Error: Unexpected closing tag </${tagName}> found.`;
                errorList.appendChild(errorItem);
            } else {
                tagStack.pop();
            }
        }
    }

    if (tagStack.length > 0) {
        errorFound = true;
        tagStack.forEach((unclosedTag) => {
            const errorItem = document.createElement('li');
            errorItem.textContent = `Error: Unclosed tag <${unclosedTag}> found.`;
            errorList.appendChild(errorItem);
        });
    }

    if (errorFound) {
        outputElement.appendChild(errorList);
    } else {
        outputElement.textContent = 'No errors found in the HTML.';
    }
}

function selfClosingTag(tagName) {
    const selfClosingTags = ['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr'];
    return selfClosingTags.includes(tagName.toLowerCase());
}


const run2 = ()=>{
    const input = document.getElementById('data').value
    const output = document.getElementById('Output')
    output.innerHTML = ''

    const reg = /<[a-zA-Z/0-9]+>/g
    const stk = input.match(reg)
    console.log(stk)

    // while( m = reg.exec(input) ){
    //     stk.push(m[0])
    // }

    
    
    
}