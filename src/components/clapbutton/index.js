import { ClapButton } from '@lyket/react';

const BlogPost = ({ title, content }) => {
    
    return (
        <>
            {title}
            <ClapButton id="diy-fish-holder" namespace="post" />
            {content}
        </>
    );
};

export default BlogPost;