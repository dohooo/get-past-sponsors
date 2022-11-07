import { chromium } from 'playwright'

export default function (username: string) {
    return new Promise(async (resolve, reject) => {
        const browser = await chromium.launch();
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto(`https://github.com/sponsors/${username}`);
        let userIDs: string[] = []
        try {
            userIDs = await page.$$eval('#sponsors', (el) => {
                if (!el) {
                    return []
                }
                const pastSponsorshipsList = el[1].querySelector('remote-pagination>div')
                const childrenCollection = Object.values(pastSponsorshipsList!.children || {})
                const userIDs: string[] = []
                childrenCollection.forEach((el: any, i) => {
                    if (childrenCollection.length - 1 !== i) {
                        const [, userID] = (el?.children?.[0]?.getAttribute('href') || "").split('/') as unknown as string
                        return userIDs.push(userID)
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