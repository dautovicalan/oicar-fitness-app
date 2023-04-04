using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FitPal_Models.ErrorModel
{
    public class HttpError
    {
        public string Message { get; private set; }

        public HttpError(string message)
        {
            Message = message;
        }
    }
}
