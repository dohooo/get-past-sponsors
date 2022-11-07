# get-past-sponsors

> The new Sponsors Profile is [released](https://github.com/community/community/discussions/37234) that includes the past sponsors. But we can't get the past sponsors from the API.

<p align='center'>
  <em>💰 Simple script to get the past sponsors.</em>
</p>

## Installation

```bash
pnpm install get-past-sponsors
```

## Usage

```ts
import getPastSponsors from "get-past-sponsors";

await get('dohooo')
.then(sponsors=>{
  // ['username_0', 'username_0', 'username_0', 'username_0']
  console.log(sponsors)
})
.catch(e=>{
  console.error(e)
})
```


## Sponsors

<p align="center">
  <img src='https://github.com/dohooo/sponsors/blob/master/sponsors.png?raw=true'/>
</p>

## License

[MIT](./LICENSE) License © 2022 [Dohooo](https://github.com/dohooo)
