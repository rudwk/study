using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Diagnostics;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace whiteboard
{
    public partial class Form1 : Form
    {
        enum tools
        {
            line,
            free,
            reac,
            elips
        }

        public Form1()
        {
            InitializeComponent();
        }
        Point stP;
        Point edP;
        Pen pen = new Pen(Color.Black, 3);
        //Bitmap bitmap;
        Graphics g;
        tools toolMode = tools.line;

        private void Form1_MouseDown(object sender, MouseEventArgs e)
        {
            stP = new Point(e.X,e.Y);
            g = CreateGraphics();
        }

        private void Form1_MouseUp(object sender, MouseEventArgs e)
        {
            edP = new Point(e.X, e.Y);
            
            int width = Math.Abs(edP.X - stP.X);
            int hight = Math.Abs(edP.Y - stP.Y);
            Rectangle rect = new Rectangle(stP.X > edP.X ? edP.X : stP.X, stP.Y > edP.Y ? edP.Y : stP.Y, width, hight);
            switch (toolMode)
            {
                case tools.line:
                    g.DrawLine(pen, stP, edP); break;

                case tools.reac:
                    g.DrawRectangle(pen, rect); break;

                case tools.elips:
                    g.DrawEllipse(pen, rect); break;
            }
        }


        private void Form1_MouseMove(object sender, MouseEventArgs e)
        {

            if (e.Button == MouseButtons.Left && toolMode == tools.free)
            {
                g.DrawLine(pen, stP, e.Location);
                stP = e.Location;
            }
        }
        private void clearButton_Click(object sender, EventArgs e)
        {
            g.Clear(Color.White);
            this.Invalidate();
        }

        private void line_CheckedChanged(object sender, EventArgs e)
        {
            toolMode = tools.line;
        }

        private void freedraw_CheckedChanged(object sender, EventArgs e)
        {
            toolMode = tools.free;
        }

        private void reactangle_CheckedChanged(object sender, EventArgs e)
        {
            toolMode = tools.reac;
        }

        private void radioElips_CheckedChanged(object sender, EventArgs e)
        {
            toolMode = tools.elips;
        }
    }
}
