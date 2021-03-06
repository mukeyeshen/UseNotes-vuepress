const utils = require('./utils')
// https://v1.vuepress.vuejs.org/zh/config
module.exports = {
    base: '/',
    // 额外的需要被注入到当前页面的 HTML <head> 中的标签
    head: [
        ['link', {rel: 'icon', href: '/images/icons/logo.png'}],
        ['link', {rel: 'apple-touch-icon', href: '/images/icons/logo.png'}],
        // ['link', {rel: 'mask-icon', href: '/images/icons/safari-pinned-tab.svg', color: '#3eaf7c'}],
        // https://developer.mozilla.org/zh-CN/docs/Mozilla/Add-ons/WebExtensions/manifest.json
        ['link', {rel: 'manifest', href: '/manifest.json'}],
        ['meta', {name: 'theme-color', content: '#3eaf7c'}],
        ['meta', {name: 'apple-mobile-web-app-capable', content: 'yes'}],
        ['meta', {name: 'apple-mobile-web-app-status-bar-style', content: 'black'}],
        ['meta', {name: 'msapplication-TileImage', content: '/images/icons/logo.png'}],
        ['meta', {name: 'msapplication-TileColor', content: '#ffffff'}]
    ],
    theme: '',
    // 指定 VuePress build 的输出目录。如果传入的是相对路径，则会基于 process.cwd() 进行解析。
    // 与package.json中的scripts配置编译路径配合使用
    dest: './docs',
    locales: {
        // 键名是该语言所属的子路径
        // 作为特例，默认语言可以使用 '/' 作为其路径。
        '/': {
            lang: 'zh-CN',// 将会被设置为 <html> 的 lang 属性
            // 没有声明 title 或者 description，VuePress 将会尝试使用配置顶层的对应值
            title: 'Bajins',
            description: '个人笔记',
        }
    },
    themeConfig: {
        // 假定是 GitHub. 同时也可以是一个完整的 GitLab URL,当你提供了 themeConfig.repo 选项，
        // 将会自动在每个页面的导航栏生成生成一个 GitHub 链接，以及在页面的底部生成一个 "Edit this page" 链接。
        repo: 'woytu/UseNotes',
        editLinks: true,
        docsDir: '/',
        // valine 评论系统
        valineConfig: {
            appId: 'm9S5QXsdju39LvMs8ooRRIiF-MdYXbMMI',// your appId
            appKey: 'UfBRjySkb4bjPiFuH0Pxe3a9', // your appKey
        },
        // 博客设置
        // blogConfig: {
        // category: {
        // location: 2, // 在导航栏菜单中所占的位置，默认2
        // text: 'Category' // 默认 “分类”
        // },
        // tag: {
        // location: 3, // 在导航栏菜单中所占的位置，默认3
        // text: 'Tag' // 默认 “标签”
        // }
        // },
        editLinkText: '在 GitHub 上编辑此页',
        nav: utils.getNavigationMenu("./").concat(require('./nav')),
        logo: '/images/icons/logo.png',
        // 搜索设置
        search: true,
        searchMaxSuggestions: 10,
        // 侧边栏 用工具自动获取文件夹结构,auto自动形成侧边导航
        sidebar: utils.getSidebars("./"),
        // 最后更新时间
        lastUpdated: '上次更新',
        // 作者
        author: 'Bajins',
    },
    // 插件
    plugins: [
        // 返回顶部按钮true显示、false不显示
        ['@vuepress/back-to-top', false],

        ['@vuepress/pwa', {
            // 如果设置为 true，VuePress 将自动生成并注册一个 Service Worker，用于缓存页面的内容以供离线使用（仅会在生产环境中启用）
            serviceWorker: true,
            // 使用自定义组件
            // popupComponent: 'MySWUpdatePopup',
            // 本选项开启了一个用于刷新内容的弹窗。这个弹窗将会在站点有内容更新时显示出来，并提供了一个 refresh 按钮，允许用户立即刷新内容。
            // updatePopup: true
            updatePopup: {
                message: "发现新内容可用",
                buttonText: "刷新"
            }
        }],
        // 用于缩放图像的JavaScript库
        ['@vuepress/medium-zoom', true],
        // 提供 Google Analytics ID 以启用集成。
        ['@vuepress/google-analytics', {
            ga: 'UA-137200206-1'
        }],
        ['container', {
            type: 'vue',
            before: '<pre class="vue-container"><code>',
            after: '</code></pre>',
        }],
        ['container', {
            type: 'upgrade',
            before: info => `<UpgradePath title="${info}">`,
            after: '</UpgradePath>',
        }],
        // 流程图
        ['flowchart'],
    ],
    markdown: {
        // 是否在每个代码块的左侧显示行号。
        lineNumbers: false
    },
}
