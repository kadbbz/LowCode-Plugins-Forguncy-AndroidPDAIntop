using GrapeCity.Forguncy.Commands;
using GrapeCity.Forguncy.Plugin;
using Jiguang.JPush;
using Jiguang.JPush.Model;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.IO;
using System.Net;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Markup;
using System.Xml.Serialization.Configuration;

namespace AndroidPDACommand
{
    [Icon("pack://application:,,,/AndroidPDACommand;component/Resources/Icon_Phone.png")]
    [Category("活字格安卓容器（HAC）")]
    [OrderWeight(100)]
    public class JPushServerCommand : Command, ICommandExecutableInServerSideAsync
    {
        private static string JPUSH_HAC_AK = "599fe3f0f0f55d42155fae05";
        private static string JPUSH_HAC_SK = "ee4f3898626d5c011f1931f7";
        private static JPushClient client = new JPushClient(JPUSH_HAC_AK, JPUSH_HAC_SK);

        [FormulaProperty]
        [DisplayName("推送对象（RegID）")]
        [Description("可通过【读取极光推送RegID】命令获得，需要批量推送时以半角逗号分隔")]
        [OrderWeight(101)]
        public object TargetRegIds { get; set; }

        [FormulaProperty]
        [DisplayName("文字内容")]
        [OrderWeight(103)]
        public object MessageText { get; set; }

        [FormulaProperty]
        [DisplayName("标题内容")]
        [OrderWeight(102)]
        public object TitleText { get; set; }

        [FormulaProperty]
        [DisplayName("点击后跳转到页面")]
        [Description("用户点击推送消息后，会自动跳转到该页面，可通过URL的参数传递具体的值，然后通过【GetURLQueryValue】函数读取")]
        [OrderWeight(110)]
        public object UrlText { get; set; }

        [ResultToProperty]
        [DisplayName("将处理结果保存到变量")]
        [Description("来自JPush服务器的返回码，语义和HTTP StatusCode类似，正常推送时返回200")]
        [OrderWeight(200)]
        public string ReturnCodeParam { get; set; } = "JPush返回码";

        public async Task<ExecuteResult> ExecuteAsync(IServerCommandExecuteContext dataContext)
        {
            // 先处理公式
            var targets = (await dataContext.EvaluateFormulaAsync(TargetRegIds)).ToString();
            var message = (await dataContext.EvaluateFormulaAsync(MessageText)).ToString();
            var title = (await dataContext.EvaluateFormulaAsync(TitleText)).ToString();
            var url = (await dataContext.EvaluateFormulaAsync(UrlText)).ToString();

            // 再根据输入参数决定是否自带跳转逻辑
            Dictionary<string, object> intentObj = new Dictionary<string, object>();

            if (!string.IsNullOrEmpty(url))
            {
                intentObj.Add("url", "intent:#Intent;action=com.huozige.lab.container.navigate;component=com.huozige.lab.container/com.huozige.lab.container.MainActivity;S.url=" + System.Web.HttpUtility.UrlEncode(url) + ";end");
            }
            else
            {
                intentObj.Add("url", "intent:#Intent;action=com.huozige.lab.container.navigate;component=com.huozige.lab.container/com.huozige.lab.container.MainActivity;end");
            }

            string log = "采用极光推送发送通知给" + targets + "，服务器返回：";
            int returnCode = -1;

            // 组织发给JPush的数据结构
            PushPayload pushPayload = new PushPayload()
            {
                Platform = new List<string> { "android" }, // 仅推送Android渠道
                Audience = new Audience()
                {
                    RegistrationId = new List<string>(targets.Split(',')) // 一次推送给多个注册ID
                },
                Notification = new Notification
                {
                    Alert = message,
                    Android = new Android
                    {
                        Alert = message,
                        Title = title,
                        Indent = intentObj
                    }
                }
            };

            // 发送请求到JPush
            var response = client.SendPush(pushPayload);

            // 记录JPush的返回结果
            if (response != null)
            {
                returnCode = (int)response.StatusCode;
                log += response.StatusCode;
                log += "，详情为";
                log += response.Content;
            }
            else
            {
                log += "null";
            }

            dataContext.Log.AppendLine(log);

            if (!string.IsNullOrEmpty(ReturnCodeParam))
            {
                dataContext.Parameters[ReturnCodeParam] = returnCode;
            }

            return new ExecuteResult();
        }

        public override string ToString()
        {
            return "极光推送（批量单推）";
        }

        /// <summary>
        /// 插件类型：设置为服务端命令插件
        /// </summary>
        /// <returns>插件类型枚举</returns>
        public override CommandScope GetCommandScope()
        {
            return CommandScope.ServerSide;
        }
    }
}
