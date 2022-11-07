import { chromium } from 'playwright'

export interface IUser {
    username: string
    avatar: string
}

export default function (username: string) {
    return new Promise(async (resolve, reject) => {
        const browser = await chromium.launch();
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto(`https://github.com/sponsors/${username}`);
        let userIDs: IUser[] = []
        try {
            userIDs = await page.$$eval('#sponsors', (el) => {
                if (!el) {
                    return []
                }
                const pastSponsorshipsList = el[1].querySelector('remote-pagination>div')
                const childrenCollection = Object.values(pastSponsorshipsList!.children || {})
                const userIDs: IUser[] = []
                childrenCollection.forEach((el: any, i) => {
                    if (childrenCollection.length - 1 !== i) {
                        const aTag = el?.children?.[0]
                        const [, username] = (aTag?.getAttribute('href') || "").split('/') as unknown as string
                        const imgTag = aTag?.children?.[0]
                        const avatar = (imgTag?.getAttribute('src') || "") as unknown as string
                        return userIDs.push({
                            username,
                            avatar
                        })
                    }
                })
                return userIDs
            })
        } catch (e) {
            reject(new Error('User not found'))
        } finally {
            await browser.close();
            resolve(userIDs)
        }
    })
}