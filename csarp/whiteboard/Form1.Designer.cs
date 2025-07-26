namespace whiteboard
{
    partial class Form1
    {
        /// <summary>
        /// 필수 디자이너 변수입니다.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// 사용 중인 모든 리소스를 정리합니다.
        /// </summary>
        /// <param name="disposing">관리되는 리소스를 삭제해야 하면 true이고, 그렇지 않으면 false입니다.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form 디자이너에서 생성한 코드

        /// <summary>
        /// 디자이너 지원에 필요한 메서드입니다. 
        /// 이 메서드의 내용을 코드 편집기로 수정하지 마세요.
        /// </summary>
        private void InitializeComponent()
        {
            this.radioLine = new System.Windows.Forms.RadioButton();
            this.clearButton = new System.Windows.Forms.Button();
            this.radioFree = new System.Windows.Forms.RadioButton();
            this.radioRect = new System.Windows.Forms.RadioButton();
            this.radioElips = new System.Windows.Forms.RadioButton();
            this.SuspendLayout();
            // 
            // radioLine
            // 
            this.radioLine.AutoSize = true;
            this.radioLine.Font = new System.Drawing.Font("굴림", 12F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.radioLine.Location = new System.Drawing.Point(618, 77);
            this.radioLine.Name = "radioLine";
            this.radioLine.Size = new System.Drawing.Size(59, 20);
            this.radioLine.TabIndex = 0;
            this.radioLine.TabStop = true;
            this.radioLine.Text = "직선";
            this.radioLine.UseVisualStyleBackColor = true;
            this.radioLine.CheckedChanged += new System.EventHandler(this.line_CheckedChanged);
            // 
            // clearButton
            // 
            this.clearButton.Location = new System.Drawing.Point(618, 31);
            this.clearButton.Name = "clearButton";
            this.clearButton.Size = new System.Drawing.Size(59, 24);
            this.clearButton.TabIndex = 1;
            this.clearButton.Text = "지우기";
            this.clearButton.UseVisualStyleBackColor = true;
            this.clearButton.Click += new System.EventHandler(this.clearButton_Click);
            // 
            // radioFree
            // 
            this.radioFree.AutoSize = true;
            this.radioFree.Font = new System.Drawing.Font("굴림", 12F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.radioFree.Location = new System.Drawing.Point(618, 103);
            this.radioFree.Name = "radioFree";
            this.radioFree.Size = new System.Drawing.Size(59, 20);
            this.radioFree.TabIndex = 2;
            this.radioFree.TabStop = true;
            this.radioFree.Text = "곡선";
            this.radioFree.UseVisualStyleBackColor = true;
            this.radioFree.CheckedChanged += new System.EventHandler(this.freedraw_CheckedChanged);
            // 
            // radioRect
            // 
            this.radioRect.AutoSize = true;
            this.radioRect.Font = new System.Drawing.Font("굴림", 12F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.radioRect.Location = new System.Drawing.Point(618, 129);
            this.radioRect.Name = "radioRect";
            this.radioRect.Size = new System.Drawing.Size(76, 20);
            this.radioRect.TabIndex = 3;
            this.radioRect.TabStop = true;
            this.radioRect.Text = "사각형";
            this.radioRect.UseVisualStyleBackColor = true;
            this.radioRect.CheckedChanged += new System.EventHandler(this.reactangle_CheckedChanged);
            // 
            // radioElips
            // 
            this.radioElips.AutoSize = true;
            this.radioElips.Font = new System.Drawing.Font("굴림", 12F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.radioElips.Location = new System.Drawing.Point(618, 155);
            this.radioElips.Name = "radioElips";
            this.radioElips.Size = new System.Drawing.Size(76, 20);
            this.radioElips.TabIndex = 4;
            this.radioElips.TabStop = true;
            this.radioElips.Text = "타원형";
            this.radioElips.UseVisualStyleBackColor = true;
            this.radioElips.CheckedChanged += new System.EventHandler(this.radioElips_CheckedChanged);
            // 
            // Form1
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(7F, 12F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(800, 450);
            this.Controls.Add(this.radioElips);
            this.Controls.Add(this.radioRect);
            this.Controls.Add(this.radioFree);
            this.Controls.Add(this.clearButton);
            this.Controls.Add(this.radioLine);
            this.Name = "Form1";
            this.Text = "Form1";
            this.MouseDown += new System.Windows.Forms.MouseEventHandler(this.Form1_MouseDown);
            this.MouseMove += new System.Windows.Forms.MouseEventHandler(this.Form1_MouseMove);
            this.MouseUp += new System.Windows.Forms.MouseEventHandler(this.Form1_MouseUp);
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.RadioButton radioLine;
        private System.Windows.Forms.Button clearButton;
        private System.Windows.Forms.RadioButton radioFree;
        private System.Windows.Forms.RadioButton radioRect;
        private System.Windows.Forms.RadioButton radioElips;
    }
}

