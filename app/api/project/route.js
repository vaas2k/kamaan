// app/api/contact/route.js
import { NextResponse } from "next/server";
import { transporter, mailOptions } from "@/lib/transporter";

export async function POST(req) {
  try {
    const { 
      name, 
      email, 
      company, 
      projectType, 
      budget, 
      timeline, 
      description,
  // Added project name field
    } = await req.json();

    // Validate required fields
    if (!name || !email || !projectType || !budget || !description ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Email template for project inquiry
    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #84cc16, #65a30d); color: white; padding: 25px; border-radius: 10px 10px 0 0; text-align: center; }
            .content { background: #f9f9f9; padding: 25px; border-radius: 0 0 10px 10px; }
            .section { margin-bottom: 20px; padding: 15px; background: white; border-radius: 8px; border-left: 4px solid #84cc16; }
            .field { margin-bottom: 12px; display: flex; }
            .label { font-weight: bold; color: #84cc16; min-width: 140px; }
            .value { color: #555; flex: 1; }
            .project-title { font-size: 24px; font-weight: bold; color: #84cc16; margin: 0; }
            .urgent { background: #fef3cd; border-left-color: #f59e0b; }
            .highlight { background: #e8f5e8; padding: 15px; border-radius: 5px; margin: 15px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0; font-size: 28px;">🚀 New Project Inquiry</h1>
              <p style="margin: 5px 0 0 0; opacity: 0.9;">Kamaan Digital Agency</p>
            </div>
            
            <div class="content">
              <!-- Project Title Section -->
              <div class="section" style="text-align: center; background: linear-gradient(135deg, #f0fdf4, #dcfce7);">
                <h2 class="project-title"></h2>
                <p style="color: #666; margin: 5px 0 0 0;">Project Inquiry Received</p>
              </div>

              <!-- Client Information Section -->
              <div class="section">
                <h3 style="color: #84cc16; margin-top: 0;">👤 Client Information</h3>
                <div class="field">
                  <span class="label">Client Name:</span>
                  <span class="value">${name}</span>
                </div>
                
                <div class="field">
                  <span class="label">Email:</span>
                  <span class="value">
                    <a href="mailto:${email}" style="color: #84cc16; text-decoration: none;">${email}</a>
                  </span>
                </div>
                
                ${company ? `
                <div class="field">
                  <span class="label">Company:</span>
                  <span class="value">${company}</span>
                </div>
                ` : ''}
              </div>

              <!-- Project Details Section -->
              <div class="section">
                <h3 style="color: #84cc16; margin-top: 0;">📋 Project Details</h3>
                
                <div class="field">
                  <span class="label">Project Name:</span>
                  <span class="value" style="font-weight: bold; color: #333;"</span>
                </div>
                
                <div class="field">
                  <span class="label">Service Type:</span>
                  <span class="value">
                    <span style="display: inline-block; padding: 4px 12px; background: #84cc16; color: white; border-radius: 20px; font-size: 12px; font-weight: bold;">
                      ${getProjectTypeLabel(projectType)}
                    </span>
                  </span>
                </div>
                
                <div class="field">
                  <span class="label">Budget Range:</span>
                  <span class="value">
                    <strong style="color: #84cc16;">${getBudgetLabel(budget)}</strong>
                  </span>
                </div>
                
                ${timeline ? `
                <div class="field">
                  <span class="label">Timeline:</span>
                  <span class="value">
                    ${getTimelineLabel(timeline)}
                    ${timeline === 'urgent' ? ' ⚡' : ''}
                  </span>
                </div>
                ` : ''}
              </div>

              <!-- Project Description Section -->
              <div class="section ${timeline === 'urgent' ? 'urgent' : ''}">
                <h3 style="color: #84cc16; margin-top: 0;">📝 Project Description</h3>
                <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; border: 1px solid #e9ecef;">
                  <p style="margin: 0; color: #555; white-space: pre-line;">${description}</p>
                </div>
                ${timeline === 'urgent' ? `
                <div style="margin-top: 15px; padding: 10px; background: #fef3cd; border-radius: 5px; text-align: center;">
                  <strong>⚡ URGENT PROJECT:</strong> Client requested urgent timeline
                </div>
                ` : ''}
              </div>

              <!-- Action Required Section -->
              <div class="highlight">
                <h4 style="color: #84cc16; margin: 0 0 10px 0;">📧 Action Required</h4>
                <p style="margin: 0;">
                  <strong>Please contact the client within 24 hours:</strong><br>
                  📞 Call: <a href="tel:${email}" style="color: #84cc16;">Schedule a call</a><br>
                  ✉️ Email: <a href="mailto:${email}" style="color: #84cc16;">${email}</a>
                </p>
              </div>

              <!-- Project Summary -->
              <div style="margin-top: 20px; padding: 15px; background: #f1f5f9; border-radius: 5px; font-size: 14px;">
                <strong>Quick Summary:</strong><br>
                ${getProjectTypeLabel(projectType)} - ${getBudgetLabel(budget)}
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    const emailText = `
🎯 NEW PROJECT INQUIRY - KAMAAN DIGITAL AGENCY
=============================================

PROJECT

CLIENT INFORMATION:
------------------
Name: ${name}
Email: ${email}
${company ? `Company: ${company}` : ''}

PROJECT DETAILS:
---------------
Service Type: ${getProjectTypeLabel(projectType)}
Budget Range: ${getBudgetLabel(budget)}
${timeline ? `Timeline: ${getTimelineLabel(timeline)}` : ''}

PROJECT DESCRIPTION:
-------------------
${description}

${timeline === 'urgent' ? '⚡ URGENT: Client requested urgent timeline' : ''}

ACTION REQUIRED:
---------------
Please contact ${name} at ${email} within 24 hours to discuss this ${getProjectTypeLabel(projectType)} project.

Project Summary: ${getProjectTypeLabel(projectType)} - ${getBudgetLabel(budget)}
    `;

    // Send email to agency
    await transporter.sendMail({
      ...mailOptions,
      subject: `🎯 New Project: ${getProjectTypeLabel(projectType)} - ${getBudgetLabel(budget)}`,
      text: emailText,
      html: emailHtml,
      replyTo: email
    });

    // Send confirmation email to client
    await transporter.sendMail({
      from: mailOptions.from,
      to: email,
      subject: `Thank You for Your Project Inquiry - Kamaan Digital Agency`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #84cc16, #65a30d); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="margin: 0;">Thank You for Your Project Inquiry!</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">We're excited to learn about your project</p>
          </div>
          
          <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
            <div style="text-align: center; margin-bottom: 25px;">
              <h2 style="color: #84cc16; margin: 0;">""</h2>
              <p style="color: #666; margin: 5px 0;">Project Inquiry Received</p>
            </div>
            
            <p>Hi <strong>${name}</strong>,</p>
            
            <p>Thank you for considering Kamaan Digital Agency for your <strong>${getProjectTypeLabel(projectType)}</strong> project. We've received your inquiry for <strong>""</strong> and we're excited about the possibility of working together.</p>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #84cc16;">
              <h3 style="color: #84cc16; margin-top: 0;">📋 What's Next?</h3>
              <ul style="color: #555;">
                <li><strong>Project Review:</strong> Our team is reviewing your project requirements</li>
                <li><strong>Expert Assignment:</strong> We'll match your project with the right specialist</li>
                <li><strong>Initial Contact:</strong> You'll hear from us within 24 hours</li>
                <li><strong>Detailed Proposal:</strong> We'll provide a comprehensive project proposal</li>
              </ul>
            </div>
            
            <div style="background: #f0fdf4; padding: 15px; border-radius: 5px; margin: 20px 0;">
              <h4 style="color: #84cc16; margin: 0 0 10px 0;">Project Summary</h4>
              <p style="margin: 5px 0;"><strong>Project:</strong> </p>
              <p style="margin: 5px 0;"><strong>Service:</strong> ${getProjectTypeLabel(projectType)}</p>
              <p style="margin: 5px 0;"><strong>Budget:</strong> ${getBudgetLabel(budget)}</p>
              ${timeline ? `<p style="margin: 5px 0;"><strong>Timeline:</strong> ${getTimelineLabel(timeline)}</p>` : ''}
            </div>
            
            <p>If you have any additional details or questions in the meantime, feel free to reply to this email.</p>
            
            <p>We look forward to helping bring <strong>""</strong> to life!</p>
            
            <p>Best regards,<br>
            <strong>The Kamaan Digital Agency Team</strong></p>
            
            <div style="margin-top: 25px; padding-top: 20px; border-top: 1px solid #e5e5e5; text-align: center; color: #666; font-size: 12px;">
              <p>Kamaan Digital Agency<br>
              Video Editing • 3D Modeling • Web Development</p>
            </div>
          </div>
        </div>
      `
    });

    return NextResponse.json(
      { 
        success: true, 
        message: "Project inquiry submitted successfully",
        data: {
          client: name,
          email,
          service: getProjectTypeLabel(projectType),
          budget: getBudgetLabel(budget)
        }
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { 
        error: "Failed to submit project inquiry",
        details: error.message 
      },
      { status: 500 }
    );
  }
}

// Helper functions to format the values
function getProjectTypeLabel(type) {
  const types = {
    'video-editing': '🎬 Video Editing',
    '3d-modeling': '🎮 3D Modeling & Animation',
    'web-development': '🌐 Website Development',
    'multiple': '🔧 Multiple Services'
  };
  return types[type] || type;
}

function getBudgetLabel(budget) {
  const budgets = {
    '1k-5k': '$1,000 - $5,000',
    '5k-15k': '$5,000 - $15,000',
    '15k-50k': '$15,000 - $50,000',
    '50k+': '$50,000+'
  };
  return budgets[budget] || budget;
}

function getTimelineLabel(timeline) {
  const timelines = {
    'urgent': 'Urgent (1-2 weeks) ⚡',
    'standard': 'Standard (3-4 weeks)',
    'flexible': 'Flexible (1-2 months)'
  };
  return timelines[timeline] || timeline;
}

export async function GET() {
  return NextResponse.json(
    { message: "Contact API is working" },
    { status: 200 }
  );
}