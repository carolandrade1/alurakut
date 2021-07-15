import React from 'react';
import MetaTags from 'react-meta-tags';

class Component1 extends React.Component {
    render() {
        return (
            <div class="wrapper">
                <MetaTags>
                    <meta charset="utf-8" />
                    <link rel="icon" href="./Orkut_Logo_2.png" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <meta name="description" content="Site Alurakut (Baseado Orkut)" />
                    <title>Alurakut</title>
                </MetaTags>
            </div>
        )
    }
}