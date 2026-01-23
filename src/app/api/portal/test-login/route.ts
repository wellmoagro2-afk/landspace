import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyPin } from '@/lib/portal-auth';

/**
 * Endpoint de teste para debug do login
 * REMOVER EM PRODUÇÃO
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { protocol, pin } = body;

    if (!protocol || !pin) {
      return NextResponse.json(
        { error: 'Protocolo e PIN são obrigatórios' },
        { status: 400 }
      );
    }

    const normalizedProtocol = protocol.trim().toUpperCase();
    const normalizedPin = pin.trim();

    // Buscar TODOS os projetos
    const allProjects = await prisma.project.findMany({
      select: {
        id: true,
        protocol: true,
        clientName: true,
        pinHash: true,
      },
    });

    // Tentar encontrar o projeto
    let project = allProjects.find(p => p.protocol === normalizedProtocol);
    
    if (!project) {
      // Tentar case-insensitive
      project = allProjects.find(p => p.protocol.toUpperCase() === normalizedProtocol);
    }

    if (!project) {
      return NextResponse.json({
        success: false,
        error: 'PROTOCOL_NOT_FOUND',
        debug: {
          protocolBuscado: normalizedProtocol,
          protocolBuscadoLength: normalizedProtocol.length,
          protocolBuscadoChars: normalizedProtocol.split('').map((c: string, i: number) => ({
            char: c,
            code: c.charCodeAt(0),
            position: i,
          })),
          projetosNoBanco: allProjects.map(p => ({
            protocol: p.protocol,
            protocolLength: p.protocol.length,
            protocolChars: p.protocol.split('').map((c: string, i: number) => ({
              char: c,
              code: c.charCodeAt(0),
              position: i,
            })),
            clientName: p.clientName,
          })),
        },
      });
    }

    // Verificar PIN
    const isValid = await verifyPin(normalizedPin, project.pinHash);

    return NextResponse.json({
      success: isValid,
      error: isValid ? undefined : 'INVALID_PIN',
      debug: {
        projetoEncontrado: {
          id: project.id,
          protocol: project.protocol,
          clientName: project.clientName,
        },
        pinInfo: {
          pinLength: normalizedPin.length,
          pinChars: normalizedPin.split('').map((c: string, i: number) => ({
            char: c,
            code: c.charCodeAt(0),
            position: i,
          })),
          isValid,
        },
      },
    });
  } catch (error) {
    console.error('[Test Login] Erro:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'UNKNOWN_ERROR',
        debug: {
          errorMessage: error instanceof Error ? error.message : 'Unknown error',
        },
      },
      { status: 500 }
    );
  }
}
