const Discord = require('discord.js')
const client = new Discord.Client();
const token = process.env.token;
const welcomeCNAME = "일반";
const byeCNAME = "일반";
const welcomeCComment = "안녕하세요!";
const byeCComment = "안녕히가세요!";

client.on('ready', () => {
    console.log('bot Power on')
});

client.on("guildMemberAdd", (M) => {
    const guild = M.guild;
    const NewUser = M.user;
    const WelcomeC = guild.channels.find(channel => channel.name == welcomeCNAME);
    
    WelcomeC.send(`<@${NewUser.id}> ${welcomeCComment}\n`);
    M.addRole(guild.roles.find(role => role.name == "유저"))
});

client.on("guildMemberRemove", (M) => {
    const guild = M.guild;
    const DeleteUser = M.user;
    const byeC = guild.channels.find(channel => channel.name == byeCNAME);
    
    byeC.send(`<@${DeleteUser.id}> ${byeCComment}\n`);
});

client.on('message', (msg) =>{
    if(msg.author.bot) return;

    if(msg.content === 'ping') {
        msg.reply('pong');
    }



    if(msg.content == '/대출리스트') {
        let img = 'https://yt3.ggpht.com/a/AATXAJynppti_lc8zr4xDxS3ZJsSD8MIxQYqF0gmGxNe=s176-c-k-c0x00ffffff-no-rj-mo';
        let embed = new Discord.RichEmbed()
          .setTitle('대출목록')
          .setURL('http://www.naver.com')
          .setAuthor('심초', img, 'http://www.naver.com')
          .setThumbnail(img)
          .addBlankField()
          .addField('대출리스트', '다이아')
          .addField('지민님', '40개', true)
          .addField('서우님', '10개', true)
          .addField('사람님', '0개', true)
          .addField('준범님', '0개', true)
          .addField('테스트', 'Some value here1\nSome value here2\nSome value here3\n')
          .addBlankField()
          .setTimestamp()
          .setFooter('System', img)
    
        msg.channel.send(embed)
      } else if(msg.content == '/help') {
        let helpImg = 'https://images-ext-1.discordapp.net/external/RyofVqSAVAi0H9-1yK6M8NGy2grU5TWZkLadG-rwqk0/https/i.imgur.com/EZRAPxR.png';
        let commandList = [
          {name: '/help', desc: 'help'},
          {name: 'ping', desc: '현재 핑 상태'},
          {name: '/embed', desc: 'embed'},
          {name: '/전체공지', desc: 'dm으로 전체 공지 보내기'},
          {name: '/청소', desc: '텍스트 지움(완성안됨)'},
          {name: '/초대코드', desc: '초대 코드 표기'},
        ];
        let commandStr = '';
        let embed = new Discord.RichEmbed()
          .setAuthor('Help of SYSTEM BOT', helpImg)
          .setColor('#186de6')
          .setFooter(`System :desktop:`)
          .setTimestamp()
        
        commandList.forEach(x => {
          commandStr += `• \`\`${changeCommandStringLength(`${x.name}`)}\`\` : **${x.desc}**\n`;
        });
    
        embed.addField('Commands: ', commandStr);
    
        msg.channel.send(embed)
      } else if(msg.content == '/초대코드') {
        msg.guild.channels.get(msg.channel.id).createInvite({maxAge: 0}) // maxAge: 0은 무한이라는 의미, maxAge부분을 지우면 24시간으로 설정됨
          .then(invite => {
            msg.channel.send(invite.url)
          });
      }

    if(msg.content.startsWith('/전체공지')) {
        if(msg.channel.type == 'dm'){
            return msg.reply('DM에서 사용하실수 없는 명령어 입니다.')
        }
        if(checkPermission(msg)) return
        if(msg.member != null) {
            let contents = msg.content.slice('!전체공지'.length);
            msg.member.guild.members.array().forEach(x => {
                if(x.user.bot) return;
                x.user.send(`<@${msg.author.id}> ${contents}`);
            });

            return msg.reply('전체DM을 전송하였습니다.');
        } else {
            return msg.reply('채널에서 실행해주세요.');
        }
    }
});

function checkPermission(msg) {
    if(!msg.member.hasPermission("MANAGE_MESSAGES")) {
        msg.channel.send(`<@${msg.author.id}>\n ` + "명령어를 실행할 수 있는 권한을 가지고 있지 않습니다!")
        return true;
    } else {
        return false;
    }
}

function changeCommandStringLength(str, limitLen = 8) {
    let tmp = str;
    limitLen -= tmp.length;

    for(let i=0;i<limitLen;i++) {
        tmp =+ ' ';
    }

    return tmp;
}

client.login(token);