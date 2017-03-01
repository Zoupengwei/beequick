/**
 * baiduTemplate�򵥺��õ�Javascriptģ������ 1.0.6 �汾
 * http://baidufe.github.com/BaiduTemplate
 * ��ԴЭ�飺BSD License
 * ����������ռ�������ռ� baidu.template ��nodejs����ֱ�Ӱ�װ npm install baidutemplate
 * @param str{String} dom����ID������ģ��string
 * @param data{Object} ��Ҫ��Ⱦ��json���󣬿���Ϊ�ա���dataΪ{}ʱ����Ȼ����html��
 * @return ������data��ֱ�ӷ��ر������ĺ�����������data������html��
 * @author wangxiao
 * @email 1988wangxiao@gmail.com
*/

;(function(window){

    //ȡ��������������baidu�����ռ䣬����������������commonjs�淶exports��ȥ
    //������nodejs�����£�����baidu.template������
    var baidu = typeof module === 'undefined' ? (window.baidu = window.baidu || {}) : module.exports;

    //ģ�庯����������baidu.template�����ռ��£�
    baidu.template = function(str, data){

        //�����Ƿ��и�id��Ԫ�ش��ڣ�������Ԫ������ȡԪ�ص�innerHTML/value��������Ϊ�ַ���Ϊģ��
        var fn = (function(){

            //�ж�����û��document����Ϊ������������
            if(!window.document){
                return bt._compile(str);
            };

            //HTML5�涨ID�������κβ������ո��ַ����ַ�������
            var element = document.getElementById(str);
            if (element) {

                //ȡ����Ӧid��dom����������������HTMLģ�庯��
                if (bt.cache[str]) {
                    return bt.cache[str];
                };

                //textarea��input��ȡvalue����������ȡinnerHTML
                var html = /^(textarea|input)$/i.test(element.nodeName) ? element.value : element.innerHTML;
                return bt._compile(html);

            }else{

                //��ģ���ַ�����������һ������
                //����ֱ�Ӵ����ַ�����Ϊģ�壬�����ܱ仯���࣬���˲����ǻ���
                return bt._compile(str);
            };

        })();

        //�������򷵻�HTML�ַ�����û�������򷵻غ��� ֧��data={}������
        var result = bt._isObject(data) ? fn( data ) : fn;
        fn = null;

        return result;
    };

    //ȡ�������ռ� baidu.template
    var bt = baidu.template;

    //���ǵ�ǰ�汾
    bt.versions = bt.versions || [];
    bt.versions.push('1.0.6');

    //����  ����Ӧidģ�����ɵĺ�������������
    bt.cache = {};

    //�Զ����ָ��������Ժ��������е��ַ���������HTMLע�Ϳ�ͷ <! !>
    bt.LEFT_DELIMITER = bt.LEFT_DELIMITER||'<%';
    bt.RIGHT_DELIMITER = bt.RIGHT_DELIMITER||'%>';

    //�Զ���Ĭ���Ƿ�ת�壬Ĭ��ΪĬ���Զ�ת��
    bt.ESCAPE = true;

    //HTMLת��
    bt._encodeHTML = function (source) {
        return String(source)
            .replace(/&/g,'&amp;')
            .replace(/</g,'&lt;')
            .replace(/>/g,'&gt;')
            .replace(/\\/g,'&#92;')
            .replace(/"/g,'&quot;')
            .replace(/'/g,'&#39;');
    };

    //ת��Ӱ���������ַ�
    bt._encodeReg = function (source) {
        return String(source).replace(/([.*+?^=!:${}()|[\]/\\])/g,'\\$1');
    };

    //ת��UI UI����ʹ����HTMLҳ����ǩonclick���¼�����������
    bt._encodeEventHTML = function (source) {
        return String(source)
            .replace(/&/g,'&amp;')
            .replace(/</g,'&lt;')
            .replace(/>/g,'&gt;')
            .replace(/"/g,'&quot;')
            .replace(/'/g,'&#39;')
            .replace(/\\\\/g,'\\')
            .replace(/\\\//g,'\/')
            .replace(/\\n/g,'\n')
            .replace(/\\r/g,'\r');
    };

    //���ַ���ƴ�����ɺ���������������(compile)
    bt._compile = function(str){
        var funBody = "var _template_fun_array=[];\nvar fn=(function(__data__){\nvar _template_varName='';\nfor(name in __data__){\n_template_varName+=('var '+name+'=__data__[\"'+name+'\"];');\n};\neval(_template_varName);\n_template_fun_array.push('"+bt._analysisStr(str)+"');\n_template_varName=null;\n})(_template_object);\nfn = null;\nreturn _template_fun_array.join('');\n";
        return new Function("_template_object",funBody);
    };

    //�ж��Ƿ���Object����
    bt._isObject = function (source) {
        return 'function' === typeof source || !!(source && 'object' === typeof source);
    };

    //����ģ���ַ���
    bt._analysisStr = function(str){

        //ȡ�÷ָ���
        var _left_ = bt.LEFT_DELIMITER;
        var _right_ = bt.RIGHT_DELIMITER;

        //�Էָ�������ת�壬֧�������е�Ԫ�ַ���������HTMLע�� <!  !>
        var _left = bt._encodeReg(_left_);
        var _right = bt._encodeReg(_right_);

        str = String(str)

            //ȥ���ָ�����jsע��
            .replace(new RegExp("("+_left+"[^"+_right+"]*)//.*\n","g"), "$1")

            //ȥ��ע������  <%* ��������������ע�� *%>
            //Ĭ��֧��HTMLע�ͣ���HTMLע��ƥ������ԭ�����û��п����� <! !>�����ָ���
            .replace(new RegExp("<!--.*?-->", "g"),"")
            .replace(new RegExp(_left+"\\*.*?\\*"+_right, "g"),"")

            //�����л���ȥ��  \r�س��� \t�Ʊ��� \n���з�
            .replace(new RegExp("[\\r\\t\\n]","g"), "")

            //���������Ƿָ����ڲ��������к��� б�� \ ������ �� �������취ΪHTMLת��
            .replace(new RegExp(_left+"(?:(?!"+_right+")[\\s\\S])*"+_right+"|((?:(?!"+_left+")[\\s\\S])+)","g"),function (item, $1) {
                var str = '';
                if($1){

                    //�� б�� ���� HTMLת��
                    str = $1.replace(/\\/g,"&#92;").replace(/'/g,'&#39;');
                    while(/<[^<]*?&#39;[^<]*?>/g.test(str)){

                        //����ǩ�ڵĵ�����ת��Ϊ\r  ��������һ�����滻Ϊ\'
                        str = str.replace(/(<[^<]*?)&#39;([^<]*?>)/g,'$1\r$2')
                    };
                }else{
                    str = item;
                }
                return str ;
            });


        str = str
            //��������������û�зֺţ���Ҫ�ݴ�  <%var val='test'%>
            .replace(new RegExp("("+_left+"[\\s]*?var[\\s]*?.*?[\\s]*?[^;])[\\s]*?"+_right,"g"),"$1;"+_right_)

            //�Ա��������ķֺ����ݴ�(����ת��ģʽ ��<%:h=value%>)  <%=value;%> �ų������������� <%fun1();%> �ų�������������  <%var val='test';%>
            .replace(new RegExp("("+_left+":?[hvu]?[\\s]*?=[\\s]*?[^;|"+_right+"]*?);[\\s]*?"+_right,"g"),"$1"+_right_)

            //���� <% �ָ�Ϊһ�������飬���� \t ����һ�����൱�ڽ� <% �滻Ϊ \t
            //��ģ�尴��<%��Ϊһ��һ�εģ�����ÿ�εĽ�β���� \t,���� \t ��ÿ��ģ��Ƭ��ǰ���ָ���
            .split(_left_).join("\t");

        //֧���û�����Ĭ���Ƿ��Զ�ת��
        if(bt.ESCAPE){
            str = str

                //�ҵ� \t=����һ���ַ�%> �滻Ϊ ���������ַ�,'
                //���滻�򵥱���  \t=data%> �滻Ϊ ',data,'
                //Ĭ��HTMLת��  Ҳ֧��HTMLת��д��<%:h=value%>
                .replace(new RegExp("\\t=(.*?)"+_right,"g"),"',typeof($1) === 'undefined'?'':baidu.template._encodeHTML($1),'");
        }else{
            str = str

                //Ĭ�ϲ�ת��HTMLת��
                .replace(new RegExp("\\t=(.*?)"+_right,"g"),"',typeof($1) === 'undefined'?'':$1,'");
        };

        str = str

            //֧��HTMLת��д��<%:h=value%>
            .replace(new RegExp("\\t:h=(.*?)"+_right,"g"),"',typeof($1) === 'undefined'?'':baidu.template._encodeHTML($1),'")

            //֧�ֲ�ת��д�� <%:=value%>��<%-value%>
            .replace(new RegExp("\\t(?::=|-)(.*?)"+_right,"g"),"',typeof($1)==='undefined'?'':$1,'")

            //֧��urlת�� <%:u=value%>
            .replace(new RegExp("\\t:u=(.*?)"+_right,"g"),"',typeof($1)==='undefined'?'':encodeURIComponent($1),'")

            .replace(new RegExp("\\t:v=(.*?)"+_right,"g"),"',typeof($1)==='undefined'?'':baidu.template._encodeEventHTML($1),'")

            .split("\t").join("');")

            .split(_right_).join("_template_fun_array.push('")

            //�� \r �滻Ϊ \
            .split("\r").join("\\'");

        return str;
    };

})(window);
