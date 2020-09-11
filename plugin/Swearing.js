'use strict';

const Composer = require('telegraf/composer');

const badWordsBan = [
    /(?:^|[^\wığüşöçĞÜŞÖÇI])([sSśŚšŠ]+(\s+)?[OoōŌøØõÕóÓòÒôÔöÖ]+(\s+)?[kKqQ]+(\s+)?[aAâÂäÄáÁuUūŪùÙúÚûÛ]+([yYýÝ]+)?(\s+)?([jìÌíÍįĮīĪîÎïÏiİ!¡ıIİ]+)?(\s+)?[mM]+)/i, // sokam
    /(?:^|[^\wığüşöçĞÜŞÖÇI])([aAâÂäÄáÁ@]+(\s+)?[vV]+(\s+)?[rR]+(\s+)?[aAâÂäÄáÁ@]+(\s+)?[dDtT]+)/i, // avrad
    /(?:^|[^\wığüşöçĞÜŞÖÇI])([dD]+)(\s+)?([iİ]+)(\s+)?([lL]+)(\s+)?([dD]+)(\s+)?([oO]+)/i, // dildo
    /(?:^|[^\wığüşöçĞÜŞÖÇI])([pP]+(\s+)?([jJìÌíÍįĮīĪîÎïÏiİ!¡Iı]+)(\s+)?[çcÇCJj]+(?:[^\wığüşöçĞÜŞÖÇİ]|$))/i, // piç..
    /(?:^|[^\wığüşöçĞÜŞÖÇI])([pP]+(\s+)?([jJìÌíÍįĮīĪîÎïÏiİ!¡Iı]+)(\s+)?[çcÇCJj]+(?:^|[lLeEiİ]))/i, // piçl..
    /(?:^|[^\wığüşöçĞÜŞÖÇI])([ou0@]+(\s+)?[rR]+(\s+)?[ou0@]+(\s+)?[sSzZ]+(\s+)?[pPbBvV]+)/i, // orospu..
    /(?:^|[^\wığüşöçĞÜŞÖÇI])(([pP]+)(\s+)?([oO0]+)(\s+)?([rR]+)(\s+)?([nN]+)(?!ograf[iı]))/i, // porno..
    /(?:^|[^\wığüşöçĞÜŞÖÇI])(([oO0@]+)(\s+)?([\.\,\'\:\·]+)?(\s+)?[çÇ]+(?:^|[lL]))/i, // oçl..
    /(?:^|[^\wığüşöçĞÜŞÖÇI])(([oO0@]+)(\s+)?([\.\,\'\:\·]+)?(\s+)?[çÇcC]+(?:[^\wığüşöçĞÜŞÖÇİ]|$))/i, // oç..
    /(?:^|[^\wığüşöçĞÜŞÖÇIİ])((([(sSśŚšŠ\$)]+)(\s+)?([jìÌíÍįĮīĪîÎïÏiİ!¡Iı\.\*]+)(\s+)?[kKgGqQcC]+([dir|Dir]+)?(\s+)?[jìÌíÍįĮīĪîÎïÏiİ!¡iİeEtTmMlLsS]+(\s+)?[jìÌíÍįĮīĪîÎïÏiİ!¡iİ\.\*cCéÉ3êÊeEmMnNşŞsSyY\.\$rR]+)(?!t|a))/i, //sike..
    /((?:^|[^\wığüşöçĞÜŞÖÇIİ])(([(sSśŚšŠ\$)]+)(\s+)?([jJìÌíÍįĮīĪîÎïÏiİ!¡\.\*]+)(\s+)?[kKgGqQ]+(\s+)?([iİeEmM]+)?)\b)/i, //sik
    /([yYýÝvV]+(\s+)?[aAâÂäÄáÁ@]+(\s+)?[wWvV]+(\s+)?([uU]+)?(\s+)?[şŞsSśŚšŠ\$]+(\s+)?[aAâÂäÄáÁ]+(\s+)?[kKqQhHgG]+)/i, // yavşak..
    /(?<!v(a)+(y)+)(?:^|[^\wığüşöçĞÜŞÖÇI])([aAâÂäÄáÁ@]+(\s+)?[nNňŇñÑ]+(\s+)?[aAâÂäÄáÁ@]+(\s+)?[nNňŇñÑsSşŞ\$]+)(?!ayfa|[ıIiİ]n[ıIiİ]f|[ıIiİ]n[ıIiİ]f|[ıIiİ]l)/i, // anan..
    /(?:^|[^\wığüşöçĞÜŞÖÇI])([bB]+(\s+)?[aAâÂäÄáÁ@]+(\s+)?[cC]+(\s+)?[jJìÌíÍįĮīĪîÎïÏiİ!¡ıI\.]+(\s+)?[nNňŇñÑsSşŞ\$]+)/i, // bacı
    /(?:^|[^\wığüşöçĞÜŞÖÇI])([jìÌíÍįĮīĪîÎïÏiİ!¡ıIİ]+(\s+)?[fF]+(\s+)?[sSśŚŞşšŠ\$]+(\s+)?[aAâÂäÄáÁ@]+)/i, // ifşa
    /(?:^|[^\wığüşöçĞÜŞÖÇI])([kKqQgGğĞ]+(\s+)?([aAâÂäÄáÁ@]+)?(\s+)?[śŚŞşšŠ\$]+(\s+)?([aAâÂäÄáÁ@]+)?(\s+)?[rR]+)/i, // kaşar..
    /([pPbB]+([éÉ3êÊeE]+)?[zZžŽ]+([éÉ3êÊeE]+)?[vVyY]+([éÉ3êÊeE]+)?[nNňŇñÑ]+[kKgGqQğĞ]+)/i, // pezevenk..
    /(?:^|[^\wığüşöçĞÜŞÖÇI])([yYýÝ]+(\s+)?([aAâÂäÄáÁ@]+)?(\s+)?[rR]+(\s+)?([aAâÂäÄáÁ@]+)(\s+)?[kKgGğĞqQ]+)/i, // yarak..
    /(?:^|[^\wığüşöçĞÜŞÖÇI])([yYýÝ]+(\s+)?([aAâÂäÄáÁ@]+)?(\s+)?(rr|RR)+(\s+)?([aAâÂäÄáÁ@]+))/i, // yarra
    /(?:^|[^\wığüşöçĞÜŞÖÇI])([aAâÂäÄáÁ@]+(\s+)?[zZ]+(\s+)?[gGğĞqQdD]+(\s+)?[jìÌíÍįĮīĪîÎïÏiİ!¡Iı\.]+(\s+)?[nNňŇñÑmM]+)/i, // azgın..
    /(?:^|[^\wığüşöçĞÜŞÖÇI])(ferre)/i, // ferre..
    /(?:^|[^\wığüşöçĞÜŞÖÇI])([aAâÂäÄáÁ@]+(\s+)?[mM]+(\s+)?[jìÌíÍįĮīĪîÎïÏ!¡ı\.cC]+(\s+)?[jìÌíÍįĮīĪîÎïÏiİ!¡Iı\.nN]+)/i, // amına //amcık
    /(?:^|[^\wığüşöçĞÜŞÖÇI])([aAâÂäÄáÁ@]+(\s+)?[mM]+(\s+)?[iİjìÌíÍįĮīĪîÎïÏ!¡ıI\.]+(\s+)?[nN]+[aAâÂäÄáÁ@]+)/i, // amina
    /(?:^|[^\wığüşöçĞÜŞÖÇI])([gGğĞq]+(\s+)?([öÖoOōŌ0øØóÓõÕòÒôÔ]+)?(\s+)?[tT]+(\s+)?[üÜuUūŪùÙúÚûÛ]+(\s+)?[nNňŇñÑmM]+)/i, // götün
    /(?:^|[^\wığüşöçĞÜŞÖÇI])([gGğĞq]+(\s+)?([öÖ0ōŌ0øØóÓõÕòÒôÔ])?(\s+)?[tT]+(\s+)?([öÖoOōŌ0øØóÓõÕòÒôÔeEéÉ3êÊ]+))/i, // göte
    /\b[gGğĞq]+(\s+)?[öÖ]+(\s+)?[tT]+(\s+)?([üÜuU]+)?(?:[^\wığüşöçĞÜŞÖÇİ]|$)/i, // göt götü
    /(?:^|[^\wığüşöçĞÜŞÖÇI])([aAâÂäÄáÁ@]+(\s+)?[mM]+(\s+)?[cC]+(\s+)?([jìÌíÍįĮīĪîÎïÏiİ!¡Iı\.]+)?(\s+)?[kKqgG]+)/i, // amck
    /([sSśŚşŞšŠ\$]+(\s+)?[eE3éÉêÊ]+(\s+)?[xX]+(\s+)?[dDiİtTvVyYýÝ]+)/i,
    /(?:^|[^\wığüşöçĞÜŞÖÇI])(boşalıyorum|boşalıcam|boşaldım|boşalmak|boşalırken|boşalmama)(?:[^\wığüşöçĞÜŞÖÇİ]|$)/i,
    /(?:^|[^\wığüşöçĞÜŞÖÇI])(sıçarım|sıçmayım|sıcarım)(?:[^\wığüşöçĞÜŞÖÇİ]|$)/i,
    /(seks|bitch|\bpenis|\bensest|\bkanc[iı]k|\bi[pb]+(i)?ne|\boral\b)/i,
].map(regex => text => regex.exec(text));

module.exports = Composer.match(badWordsBan, async (ctx, next) => {
    if (ctx.chat.type.endsWith('group')) {
        if (!ctx.from._is_in_admin_list) {

            await ctx.deleteMessage()                       //Küfürlü mesajı siler.
            //await ctx.kickChatMember(ctx.from.id)         //Kişiyi yasaklar açmak için başındaki // işareti silin.

        }
    }
    return next();
});