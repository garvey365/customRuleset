// Define main function (script entry)

// 国内DNS服务器
const domesticNameservers = [
  "https://dns.alidns.com/dns-query", // 阿里云公共DNS
  "https://doh.pub/dns-query", // 腾讯DNSPod
  "https://doh.360.cn/dns-query" // 360安全DNS
];
// 国外DNS服务器
const foreignNameservers = [
  "https://1.1.1.1/dns-query", // Cloudflare(主)
  "https://1.0.0.1/dns-query", // Cloudflare(备)
  "https://208.67.222.222/dns-query", // OpenDNS(主)
  "https://208.67.220.220/dns-query", // OpenDNS(备)
  "https://194.242.2.2/dns-query", // Mullvad(主)
  "https://194.242.2.3/dns-query" // Mullvad(备)
];
// DNS配置
const dnsConfig = {
  "enable": true,
  "listen": "0.0.0.0:1053",
  "ipv6": true,
  "use-system-hosts": false,
  "cache-algorithm": "arc",
  "enhanced-mode": "fake-ip",
  "fake-ip-range": "198.18.0.1/16",
  "fake-ip-filter": [
    // 本地主机/设备
    "+.lan",
    "+.local",
    // Windows网络出现小地球图标
    "+.msftconnecttest.com",
    "+.msftncsi.com",
    // QQ快速登录检测失败
    "localhost.ptlogin2.qq.com",
    "localhost.sec.qq.com",
    // 微信快速登录检测失败
    "localhost.work.weixin.qq.com"
  ],
  "default-nameserver": ["223.5.5.5", "119.29.29.29", "1.1.1.1", "8.8.8.8"],
  "nameserver": [...domesticNameservers, ...foreignNameservers],
  "proxy-server-nameserver": [...domesticNameservers, ...foreignNameservers],
  "nameserver-policy": {
    "geosite:private,cn,geolocation-cn": domesticNameservers,
    "geosite:google,youtube,telegram,gfw,geolocation-!cn": foreignNameservers
  }
};
// 规则集通用配置
const ruleProviderCommon = {
  "type": "http",
  "format": "yaml",
  "interval": 86400
};
const customRuleProviders = {
  "CustomRules": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://github.com/garvey365/customRuleset/blob/main/custom.yaml",
    "path": "ruleset/customRuleset/custom.yaml"
  },
  "OtherCustom": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://github.com/garvey365/customRuleset/blob/main/other.yaml",
    "path": "ruleset/customRuleset/other.yaml"
  },
  "AI": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://github.com/garvey365/customRuleset/blob/main/AI.yaml",
    "path": "ruleset/customRuleset/AI.yaml"

  }
  ,
}
const ruleADtesting = {

  // "AD": {
  //   "type": "http",
  //   "behavior": "domain",
  //   "url": "https://raw.githubusercontent.com/earoftoast/clash-rules/main/AD.yaml",
  //   "path": "./ruleset/adrule/AD.yaml",
  //   "interval": 86400
  // },
  // "EasyList": {
  //   "type": "http",
  //   "behavior": "domain",
  //   "url": "https://raw.githubusercontent.com/earoftoast/clash-rules/main/EasyList.yaml",
  //   "path": "./ruleset/adrule/EasyList.yaml",
  //   "interval": 86400
  // },
  // "EasyListChina": {
  //   "type": "http",
  //   "behavior": "domain",
  //   "url": "https://raw.githubusercontent.com/earoftoast/clash-rules/main/EasyListChina.yaml",
  //   "path": "./ruleset/adrule/EasyListChina.yaml",
  //   "interval": 86400
  // },
  // "EasyPrivacy": {
  //   "type": "http",
  //   "behavior": "domain",
  //   "url": "https://raw.githubusercontent.com/earoftoast/clash-rules/main/EasyPrivacy.yaml",
  //   "path": "./ruleset/adrule/EasyPrivacy.yaml",
  //   "interval": 86400
  // },
  // "ProgramAD": {
  //   "type": "http",
  //   "behavior": "domain",
  //   "url": "https://raw.githubusercontent.com/earoftoast/clash-rules/main/ProgramAD.yaml",
  //   "path": "./ruleset/adrule/ProgramAD.yaml",
  //   "interval": 86400
  // },
  // "adblock": {
  //   "type": "file",
  //   "behavior": "domain",
  //   "format": "mrs",
  //   "path": "./ruleset/adrule/adblock_reject.mrs"
  // }


};
// 规则集配置
const ruleProviders = {
  
  ...customRuleProviders,

  "reject": {
    ...ruleProviderCommon,
    "behavior": "domain",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/reject.txt",
    "path": "./ruleset/loyalsoldier/reject.yaml"
  },
  "icloud": {
    ...ruleProviderCommon,
    "behavior": "domain",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/icloud.txt",
    "path": "./ruleset/loyalsoldier/icloud.yaml"
  },
  "apple": {
    ...ruleProviderCommon,
    "behavior": "domain",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/apple.txt",
    "path": "./ruleset/loyalsoldier/apple.yaml"
  },
  "google": {
    ...ruleProviderCommon,
    "behavior": "domain",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/google.txt",
    "path": "./ruleset/loyalsoldier/google.yaml"
  },
  "proxy": {
    ...ruleProviderCommon,
    "behavior": "domain",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/proxy.txt",
    "path": "./ruleset/loyalsoldier/proxy.yaml"
  },
  "direct": {
    ...ruleProviderCommon,
    "behavior": "domain",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/direct.txt",
    "path": "./ruleset/loyalsoldier/direct.yaml"
  },
  "private": {
    ...ruleProviderCommon,
    "behavior": "domain",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/private.txt",
    "path": "./ruleset/loyalsoldier/private.yaml"
  },
  "gfw": {
    ...ruleProviderCommon,
    "behavior": "domain",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/gfw.txt",
    "path": "./ruleset/loyalsoldier/gfw.yaml"
  },
  "tld-not-cn": {
    ...ruleProviderCommon,
    "behavior": "domain",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/tld-not-cn.txt",
    "path": "./ruleset/loyalsoldier/tld-not-cn.yaml"
  },
  "telegramcidr": {
    ...ruleProviderCommon,
    "behavior": "ipcidr",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/telegramcidr.txt",
    "path": "./ruleset/loyalsoldier/telegramcidr.yaml"
  },
  "cncidr": {
    ...ruleProviderCommon,
    "behavior": "ipcidr",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/cncidr.txt",
    "path": "./ruleset/loyalsoldier/cncidr.yaml"
  },
  "lancidr": {
    ...ruleProviderCommon,
    "behavior": "ipcidr",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/lancidr.txt",
    "path": "./ruleset/loyalsoldier/lancidr.yaml"
  },
  "applications": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/applications.txt",
    "path": "./ruleset/loyalsoldier/applications.yaml"
  },
  "openai": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://fastly.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/OpenAI/OpenAI.yaml",
    "path": "./ruleset/blackmatrix7/openai.yaml"
  }
};

const customRulesConfig = [
    //自定义规则集
    "RULE-SET,CustomRules,全局直连,no-resolve",
    "RULE-SET,OtherCustom,Taiwan",
    "RULE-SET,AI,AI"
]
// 规则
const rules = [
  ...customRulesConfig,
  // 自定义规则
  "DOMAIN-SUFFIX,googleapis.cn,节点选择", // Google服务
  "DOMAIN-SUFFIX,gstatic.com,节点选择", // Google静态资源
  "DOMAIN-SUFFIX,xn--ngstr-lra8j.com,节点选择", // Google Play下载服务
  "DOMAIN-SUFFIX,github.io,节点选择", // Github Pages
  "DOMAIN,v2rayse.com,节点选择", // V2rayse节点工具
  // blackmatrix7 规则集
  "RULE-SET,openai,AI",
  // Loyalsoldier 规则集
  "RULE-SET,applications,全局直连",
  "RULE-SET,private,全局直连",
  "RULE-SET,reject,广告过滤",
  "RULE-SET,icloud,苹果服务",
  "RULE-SET,apple,苹果服务",
  "RULE-SET,google,谷歌服务",
  "RULE-SET,proxy,节点选择",
  "RULE-SET,gfw,节点选择",
  "RULE-SET,tld-not-cn,节点选择",
  "RULE-SET,direct,全局直连",
  "RULE-SET,lancidr,全局直连,no-resolve",
  "RULE-SET,cncidr,全局直连,no-resolve",
  "RULE-SET,telegramcidr,电报消息,no-resolve",
  //ruleADtesting 测试广告过滤 配置 (如影响体验则可取消当前配置)
  // "RULE-SET,AD,REJECT",
  // "RULE-SET,EasyList,REJECT",
  // "RULE-SET,EasyListChina,REJECT",
  // "RULE-SET,EasyPrivacy,REJECT",
  // "RULE-SET,ProgramAD,REJECT",
  // "RULE-SET,adblock,REJECT",
  // 其他规则
  "GEOIP,LAN,全局直连,no-resolve",
  "GEOIP,CN,全局直连,no-resolve",
  "MATCH,漏网之鱼"
];
// 代理组通用配置
const groupBaseOption = {
  "interval": 300,
  "timeout": 3000,
  "url": "https://www.google.com/generate_204",
  // "lazy": false,
  "max-failed-times": 3,
  // "hidden": false
};

// 代理组 扩展配置
const extendBaseOption = {
  "lazy": true,
  "hidden": true
};
// 程序入口
function main(config) {
  const proxyCount = config?.proxies?.length ?? 0;
  const proxyProviderCount =
    typeof config?.["proxy-providers"] === "object" ? Object.keys(config["proxy-providers"]).length : 0;
  if (proxyCount === 0 && proxyProviderCount === 0) {
    throw new Error("配置文件中未找到任何代理");
  }
  // 覆盖原配置中DNS配置
  config["dns"] = dnsConfig;
  
  // 覆盖原配置中的代理组
  config["proxy-groups"] = [
    {
      ...groupBaseOption,
      "name": "节点选择",
      "type": "select",
      "proxies": ["延迟选优", "故障转移", "负载均衡(散列)", "负载均衡(轮询)"],
      "include-all": true,
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/adjust.svg"
    },
    {
      ...groupBaseOption,
      "name": "延迟选优",
      "type": "url-test",
      "tolerance": 100,
      "include-all": true,
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/speed.svg"
    },
    {
      ...groupBaseOption,
      "name": "故障转移",
      "type": "fallback",
      "include-all": true,
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/ambulance.svg"
    },
    {
      ...groupBaseOption,
      "name": "负载均衡(散列)",
      "type": "load-balance",
      "strategy": "consistent-hashing",
      "include-all": true,
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/merry_go.svg"
    },
    {
      ...groupBaseOption,
      "name": "负载均衡(轮询)",
      "type": "load-balance",
      "strategy": "round-robin",
      "include-all": true,
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/balance.svg"
    },
    {
      ...groupBaseOption,
      "name": "谷歌服务",
      "type": "select",
      "proxies": ["节点选择", "延迟选优", "故障转移", "负载均衡(散列)", "负载均衡(轮询)", "全局直连"],
      "include-all": true,
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/google.svg"
    },
    {
      ...groupBaseOption,
      "name": "国外媒体",
      "type": "select",
      "proxies": ["节点选择", "延迟选优", "故障转移", "负载均衡(散列)", "负载均衡(轮询)", "全局直连"],
      "include-all": true,
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/youtube.svg"
    },
    {
      ...groupBaseOption,
      "name": "电报消息",
      "type": "select",
      "proxies": ["节点选择", "延迟选优", "故障转移", "负载均衡(散列)", "负载均衡(轮询)", "全局直连"],
      "include-all": true,
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/telegram.svg"
    },
    {
      ...groupBaseOption,
      "url": "https://chatgpt.com",
      "expected-status": "200",
      "name": "AI",
      "type": "select",
      "proxies": ["AllOften", "Taiwan", "Japan", "SGP", "USA"],
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/chatgpt.svg"
    },
    {
      ...groupBaseOption,
      "name": "微软服务",
      "type": "select",
      "proxies": ["全局直连", "节点选择", "延迟选优", "故障转移", "负载均衡(散列)", "负载均衡(轮询)"],
      "include-all": true,
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/microsoft.svg"
    },
    {
      ...groupBaseOption,
      "name": "苹果服务",
      "type": "select",
      "proxies": ["节点选择", "延迟选优", "故障转移", "负载均衡(散列)", "负载均衡(轮询)", "全局直连"],
      "include-all": true,
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/apple.svg"
    },
    {
      ...groupBaseOption,
      "name": "广告过滤",
      "type": "select",
      "proxies": ["REJECT", "DIRECT"],
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/bug.svg"
    },
    {
      ...groupBaseOption,
      "name": "全局直连",
      "type": "select",
      "proxies": ["DIRECT"],
      // "include-all": true,
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/link.svg"
    },
    {
      ...groupBaseOption,
      "name": "全局拦截",
      "type": "select",
      "proxies": ["REJECT"],
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/block.svg"
    },
    {
      ...groupBaseOption,
      "name": "漏网之鱼",
      "type": "select",
      "proxies": ["节点选择", "延迟选优", "故障转移", "负载均衡(散列)", "负载均衡(轮询)", "全局直连"],
      // "include-all": true,
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/fish.svg"
    },
    {
      ...groupBaseOption,
      "name": "HongKong_Auto",
      "type": "url-test",
      "tolerance": 100,
      "include-all": true,
      // "exclude-type": "direct",
      "filter": "(?i)港|hk|hongkong|hong kong",
      ...extendBaseOption
    },
    {
      ...groupBaseOption,
      "name": "HongKong",
      "type": "select",
      "proxies": ["HongKong_Auto", "DIRECT"],
      "include-all": true,
      // "exclude-type": "direct",
      "filter": "(?i)港|hk|hongkong|hong kong"
    },
    {
      ...groupBaseOption,
      "name": "Taiwan_Auto",
      "type": "url-test",
      "tolerance": 100,
      "include-all": true,
      // "exclude-type": "direct",
      "filter": "(?i)台|tw|taiwan",
      ...extendBaseOption
    },
    {
      ...groupBaseOption,
      "name": "Taiwan",
      "type": "select",
      "proxies": ["Taiwan_Auto", "DIRECT"],
      "include-all": true,
      // "exclude-type": "direct",
      "filter": "(?i)台|tw|taiwan"
    },
    {
      ...groupBaseOption,
      "name": "Japan_Auto",
      "type": "url-test",
      "tolerance": 100,
      "include-all": true,
      // "exclude-type": "direct",
      "filter": "(?i)日|jp|japan",
      ...extendBaseOption
    },
    {
      ...groupBaseOption,
      "name": "Japan",
      "type": "select",
      "proxies": ["Japan_Auto", "DIRECT"],
      "include-all": true,
      // "exclude-type": "direct",
      "filter": "(?i)日|jp|japan"
    },
    {
      ...groupBaseOption,
      "name": "USA_Auto",
      "type": "url-test",
      "tolerance": 100,
      "include-all": true,
      // "exclude-type": "direct",
      "filter": "(?i)美|us|unitedstates|united states",
      ...extendBaseOption
    },
    {
      ...groupBaseOption,
      "name": "USA",
      "type": "select",
      "proxies": ["USA_Auto", "DIRECT"],
      "include-all": true,
      // "exclude-type": "direct",
      "filter": "(?i)美|us|unitedstates|united states"
    },
    {
      ...groupBaseOption,
      "name": "SGP_Auto",
      "type": "url-test",
      "tolerance": 100,
      "include-all": true,
      // "exclude-type": "direct",
      "filter": "(?i)(新|sg|singapore)",
      ...extendBaseOption
    },
    {
      ...groupBaseOption,
      "name": "SGP",
      "type": "select",
      "proxies": ["SGP_Auto", "DIRECT"],
      "include-all": true,
      // "exclude-type": "direct",
      "filter": "(?i)(新|sg|singapore)"
    },
    {
      ...groupBaseOption,
      "name": "AllOften",
      "type": "select",
      "proxies": ["全局直连", "节点选择", "延迟选优", "故障转移"],
      "include-all": true,
      // "exclude-type": "direct",
      "filter": "(?i)^(?!.*(?:🇭🇰|🇯🇵|🇺🇸|🇸🇬|🇨🇳|港|hk|hongkong|台|tw|taiwan|日|jp|japan|新|sg|singapore|美|us|unitedstates)).*"
    }
  ];

  // 覆盖原配置中的规则
  config["rule-providers"] = ruleProviders;
  config["rules"] = rules;

  // 返回修改后的配置
  return config;
}