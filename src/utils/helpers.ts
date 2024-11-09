export async function fetchSkills(pageText: string) {
    try {
        const response = await fetch('http://localhost:3000/api/extract-skills', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: pageText }),
        });

        if (!response.ok) throw new Error('Failed to fetch data from backend');

        const data = await response.json();
        if (data && Array.isArray(data.skills)) {
            return data.skills.map((skill: string) => ({ skill, contained: true }));
        } else {
            console.error("Unexpected response format:", data);
            return [];
        }
    } catch (error) {
        console.error("Error fetching skills:", error);
        return [];
    }
}

export function getTextContentFromPage() {
    return document.body.innerText;
}

export function highlightKeywordsOnPage(skills: string[]) {
    skills.forEach((skill) => {
        const regex = new RegExp(`\\b(${skill})\\b`, 'gi');
        const highlightColor = '#D6F06B';

        function walkTextNodes(node: Node) {
            if (node.nodeType === Node.TEXT_NODE && node.textContent && node.parentNode) {
                const matches = node.textContent.match(regex);
                if (matches) {
                    const span = document.createElement('span');
                    span.innerHTML = node.textContent.replace(regex, (matched) => `<mark style="background-color: ${highlightColor}; color: black;">${matched}</mark>`);
                    node.parentNode.replaceChild(span, node);
                }
            } else if (node.nodeType === Node.ELEMENT_NODE) {
                const element = node as HTMLElement;
                if (element.nodeName !== 'SCRIPT' && element.nodeName !== 'STYLE') {
                    for (let child of Array.from(node.childNodes)) {
                        walkTextNodes(child);
                    }
                }
            }
        }

        walkTextNodes(document.body);
    });
}
