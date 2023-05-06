# HOW DOES SVG WORK?

Merge the contents from your project's metro.config.js file with this config (create the file if it does not exist already).

```sh
const {getDefaultConfig} = require('metro-config');

module.exports = (async () => {
    const {
        resolver: {sourceExts, assetExts},
    } = await getDefaultConfig();
    return {
        transformer: {
            babelTransformerPath: require.resolve('react-native-svg-transformer'),
            getTransformOptions: async () => ({
                transform: {
                    experimentalImportSupport: false,
                    inlineRequires: true,
                },
            }),
        },
        resolver: {
            assetExts: assetExts.filter(ext => ext !== 'svg'),
            sourceExts: [...sourceExts, 'svg'],
        },
    };
})();

```

### Using TypeScript

If you are using TypeScript, you need to add this to your declarations.d.ts file (create one if you don't have one already):

```sh
declare module "*.svg" {
  import React from 'react';
  import { SvgProps } from "react-native-svg";
  const content: React.FC<SvgProps>;
  export default content;
}
```

`.svgrrc` (create the file in your project's root folder if it does not exist)

```sh
module.exports = {
    replaceAttrValues: {
        '#000': '{props.fill}',
        '#000': '{props.stroke}',
    },
};
```

And then make sure your path tag inside the SVG file fill attribute is the hex code (in this case #000).

```sh
<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M2.965 6.0925C4.045 8.215 ..." fill="#000"/>
</svg>

```

You can then use your image as a component:

```sh
<Logo width={120} height={40} fill={"any color"} />
```
