export const confirmEmailTemplate = (name) => {
    

    return ` 
    <body style="margin: 0; padding: 0">
    <table role="presentation" style="
      width: 100%;
      border-collapse: collapse;
      border: 0;
      border-spacing: 0;
      background: #ffffff;
    ">
        <td align="center" style="padding: 0">
            <table role="presentation" style="
          width: 602px;
          border-collapse: collapse;
          border: 1px solid #cccccc;
          border-spacing: 0;
          text-align: left;
        ">
                <tr>
                    <td style="padding: 36px 30px 42px 30px">
                        <table role="presentation" style="
                width: 100%;
                border-collapse: collapse;
                border: 0;
                border-spacing: 0;
              ">
                            <tr>
                                <td style="padding: 0 0 36px 0; color: #153643">
                                    <h1 style="
                      font-size: 24px;
                      margin: 0 0 20px 0;
                      font-family: Arial, sans-serif;
                    ">
                                        Hola ${name} Esto es una prueba
                                    </h1>
                                </td>
                            </tr>
                            <tr>
                                <td style="padding: 0"></td>
                            </tr>

                        </table>
                    </td>
                </tr>
            </table>
        </td>
    </table>
</body>
    `

}